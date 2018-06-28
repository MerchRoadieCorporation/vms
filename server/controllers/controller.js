// const request = require('request');
const XLSX = require('xlsx');

module.exports = {
    test: (req, res) => {
        const workbook = XLSX.readFile('./sample.xlsx');
        res.send(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));
    }
}