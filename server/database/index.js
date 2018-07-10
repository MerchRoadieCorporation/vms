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

// If modifying these scopes, delete credentials.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'credentials.json';

// // Load client secrets from a local file.
// fs.readFile('client_secret.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Drive API.
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

  // authorize(clientJSON, listFiles);
  authorize(clientJSON, listMajors)
// });

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
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

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
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

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function listFiles(auth) {
  const fileIds = [];
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 1000,
    fields: 'nextPageToken, files(id, name, mimeType)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        if ((file.mimeType === 'application/vnd.google-apps.spreadsheet') && (file.name.slice(-4) === '.csv') && (file.name.slice(0, 5) === 'TRANS')) {
          fileIds.push([file.name, file.id]);
        }
      });
    } else {
      console.log('No files found.');
    }
  });
  return fileIds
}



function listMajors(auth) {


  const sheets = google.sheets({version: 'v4', auth});
  // for (let i = 0; i < fileIds.length; i++) {
  console.log(listFiles(auth))
    sheets.spreadsheets.values.get({
      spreadsheetId: '14i8Thcj8CYHhZJcW9KJ5rNx_XhcsxevgxxrkgNAjQE8',
      range: 'a'
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        rows.map((row) => {
          console.log(`MACHINE ${row[0]}, TOTAL ${row[4]}, NUMSOLD ${row[6]}`);
        });
      } else {
        console.log('No data found.');
      }
    });
  // }
}

module.exports = client;
