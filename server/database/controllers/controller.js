const db = require('../index')

module.exports = {
  get: () => {
    console.log('yes')
  },

  filteredSales: (req, res) => {
    db.query(`SELECT machine FROM sales WHERE email = '${req.body.email}'`)
      .then(data => {
        res.send(data);
      })
  }
}
