const jsonexport = require('jsonexport')
exports.toJson = require('./csv2json').toJson
exports.toCsv = async (json, options) => {
    options = options || {}
    return new Promise((r, j) => {
        jsonexport(json, {
            rowDelimiter: options.delimiter || ','
        }, function (err, csv) {
            if (err) {
                j(err)
            }else{
                r(csv)
            }
        })
    })
}