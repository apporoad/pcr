exports.toJson = (data, options) => {
    options = options || {}
    options.delimiter = options.delimiter || ","
    var content = data
    if (!content || typeof content !== "string") {
        throw new Error("Invalid CSV Data");
    }
    content = content.split(/[\n\r]+/gi);
    var Columns = content.shift().split(options.delimiter),
        jsonObject = [];

    content.forEach(function (item) {
        if (item) {
            item = item.split(options.delimiter);
            var hashItem = {}
            Columns.forEach(function (c, i) {
                hashItem[c] = item[i];
            })
            jsonObject.push(hashItem);
        }
    })
    return jsonObject
}