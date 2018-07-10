const pg = require('pg');
const request = require('request-promise')

const conString = process.env.ESQL

const client = new pg.Client(conString);

client.connect(err => {
  if(err) {
    return console.error('could not connect to postgres', err);
  } else {
    console.log('CONNECTED TO SQL');
  }
});

module.exports = client;
