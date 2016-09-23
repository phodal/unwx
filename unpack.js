var fs = require("fs");
var lodash = require("lodash");

fs.readFile("./output.wx", function (err, data) {
    var pathHeadLength = data.readInt32BE(5, 9);
    var allFilesBufferLength = data.readInt32BE(9, 13);

    var pathWithPacketHeadBuffer = data.slice(13, 13 + pathHeadLength);

    var fileNumbers = data.readInt32BE(14, 18);

    var firstFilesLength = data.readInt32BE(18, 22);
    var firstFilePath = data.slice(22, 22 + firstFilesLength);
    var currentBuffer = data.readInt32BE(22 + firstFilesLength, 26 + firstFilesLength);
    var fileDataLengthBuffer = data.readInt32BE(22 + firstFilesLength + 4, 22 + firstFilesLength + 8);

    console.log(firstFilePath.toString());
    console.log(currentBuffer);
    console.log(data.slice(14 + pathHeadLength, 14 + pathHeadLength + fileDataLengthBuffer).toString());

    // var bufferLength = 14 + pathHeadLength;
    // var fileStartPos = 14;
    // var bufferSize = 4;
    // while(bufferLength < allFilesBufferLength) {
    //     var fileLength = data.readInt32BE(fileStartPos + bufferSize, fileStartPos + bufferSize * 2);
    //     var filePath = data.slice(fileStartPos + bufferSize * 2, fileStartPos + bufferSize  * 2 + fileLength);
    //
    //     var fileDataLength = data.readInt32BE(fileStartPos + bufferSize * 3 + fileLength, fileStartPos  + bufferSize * 4 + fileLength);
    //     var fileData = data.slice(fileStartPos + pathHeadLength, fileStartPos + pathHeadLength + fileDataLength).toString();
    //
    //     console.log("--------------------------------");
    //     console.log(filePath.toString());
    // }
});