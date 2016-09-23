var fs = require("fs");
var lodash = require("lodash");

fs.readFile("./output.wx", function (err, data) {
    console.log(data.length);
    var first = data.readInt32BE(1, 5);
    var pathHeadLength = data.readInt32BE(5, 9);
    var fileDatasBufferLength = data.readInt32BE(9, 13);
    var last = data[13];

    console.log(pathHeadLength);
    console.log(fileDatasBufferLength);
    var pathWithPacketHeadBuffer = data.slice(13, 13 + pathHeadLength);

    console.log(pathWithPacketHeadBuffer);
    console.log(pathWithPacketHeadBuffer.toString());

    var fileDatasBuffer = data.slice(14 + pathHeadLength, 13 + pathHeadLength + fileDatasBufferLength);
    console.log(fileDatasBuffer);
    console.log(fileDatasBuffer.toString());
});