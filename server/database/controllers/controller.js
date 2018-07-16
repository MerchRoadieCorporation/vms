const db = require('../index')

module.exports = {
    sales: (req, res) => {
      db.query(`SELECT * FROM sales`)
        .then(data => {
          res.send(data.rows)
        })
    }
}
