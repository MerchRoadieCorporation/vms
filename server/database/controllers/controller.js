const db = require('../index')

module.exports = {
  mrSales: (req, res) => {
    db.query(`SELECT machine FROM sales WHERE email = '${req.body.email}'`)
      .then(data => {
        res.send(data);
      })
  },

  filteredTimeSales: (req, res) => {
    const machines = `{${req.body.machines.toString().slice(0, req.body.machines.toString().length)}}`
    const singleDateQuery = `SELECT * FROM sales WHERE email = '${req.body.email}'
    AND machine = ANY('${machines}'::text[])
    AND sale_date = '${req.body.dates[0]}' `
    const dateRangeQuery = `SELECT * FROM sales WHERE email = '${req.body.email}'
    AND machine = ANY('${machines}'::text[])
    AND sale_date BETWEEN '${req.body.dates[0]}'
    AND '${req.body.dates[1]}'`

    if(req.body.dates[1] === null) {
      db.query(singleDateQuery)
        .then(data => {
          res.send(data);
        })
    } else {
      db.query(dateRangeQuery)
        .then(data => {
          res.send(data);
        })
    }
  },

  getEvents: (req, res) => {
    db.query(`SELECT * FROM events WHERE email = '${req.body.email}'`)
      .then(data => {
        res.send(data);
      })
  },

  createEvent: (req, res) => {
    db.query(`SELECT exists (SELECT 1 FROM events WHERE name = '${req.body.name}' LIMIT 1)`)
      .then(data => { 
        if(data.rows[0].exists === false) {
          db.query(`INSERT INTO events(name, day, start_time, end_time, email) VALUES ('${req.body.name}', '${req.body.day}', '${req.body.startTime}', '${req.body.endTime}', '${req.body.email}')`)
        }
        res.send(data);
      })
  },

  filteredEventSales: (req, res) => {
    console.log(req.body);
  }
}
