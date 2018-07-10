const db = require('../index')

module.exports = {
    sales: (req, res) => {
      db.query(`SELECT * FROM sales WHERE email = '${req.body.email}'`)
        .then(data => {
          res.send(data.rows)
        })
    }
}
