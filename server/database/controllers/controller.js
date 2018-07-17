const db = require('../index')

module.exports = {
    sales: (req, res) => {
      db.query(`SELECT * FROM sales`)
        .then(data => {
          res.send(data.rows);
        })
    },

    mrSales: (req, res) => {
      db.query(`SELECT machine FROM sales WHERE email = '${req.body.email}'`)
        .then(data => {
          res.send(data);
        })
    }
}
