const db = require('../index')

module.exports = {
    mrSales: (req, res) => {
      db.query(`SELECT machine FROM sales WHERE email = '${req.body.email}'`)
        .then(data => {
          res.send(data);
        })
    }
}
