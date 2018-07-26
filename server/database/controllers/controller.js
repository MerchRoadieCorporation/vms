const db = require('../index')

module.exports = {
  mrSales: (req, res) => {
    db.query(`SELECT machine FROM sales WHERE email = '${req.body.email}'`)
      .then(data => {
        res.send(data);
      })
  },

  filteredSales: (req, res) => {
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
  }
}
