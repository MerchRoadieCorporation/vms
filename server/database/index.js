const pg = require('pg');
const request = require('request-promise')
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const conString = process.env.ESQL

const client = new pg.Client(conString);

client.connect(err => {
  if(err) {
    return err;
  }
});

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'credentials.json';

// Authorize a client with credentials, then call the Google Drive API.
const clientJSON = {
  "installed": {
  "client_id":process.env.client_id,
  "project_id":"merch-roadie",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri":"https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
  "client_secret":process.env.client_secret,
  "redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]
  }
}

// Create an OAuth2 client with the given credentials, and then execute the given callback function.
const authorize = (credentials, callback) => {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

// Get and store new token after prompting for user authorization, and then
// execute the given callback with the authorized OAuth2 client.
const getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


// Lists the names and IDs of up to 1000 files
const listFiles = auth => {
  const fileIds = [];
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 1000,
    fields: 'nextPageToken, files(id, name, mimeType)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      files.map((file) => {
        if ((file.mimeType === 'application/vnd.google-apps.spreadsheet') && (file.name.slice(-4) === '.csv') && (file.name.slice(0, 5) === 'TRANS')) {
          fileIds.push([file.name, file.id]);
        }
      });
    } else {
      console.log('No files found.');
    }
    return fileIds
  });
}

// Retrieve sales data from Google Sheets API
const getSales = auth => {
  const fileIds = [];
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 1000,
    fields: 'nextPageToken, files(id, name, mimeType)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      files.map((file) => {
        if ((file.mimeType === 'application/vnd.google-apps.spreadsheet') && (file.name.slice(-4) === '.csv') && (file.name.slice(0, 5) === 'TRANS')) {
          fileIds.push([file.name, file.id]);
        }
      });
    } else {
      console.log('No files found.');
    }

    const sheets = google.sheets({version: 'v4', auth});
    for (let i = 0; i < fileIds.length; i++) {
      sheets.spreadsheets.values.get({
        spreadsheetId: fileIds[i][1],
        range: fileIds[i][0]
      }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
          rows.map((row) => {
            console.log(`CARD_READER ${row[0]}, TOTAL_SALE ${row[4]}, NUM_SOLD ${row[6]}`);
          });
        } else {
          console.log('No data found.');
        }
      });
    }
  });
}

authorize(clientJSON, getSales);

module.exports = client;
