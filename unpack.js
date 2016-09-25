var fs = require("fs");
var lodash = require("lodash");

fs.readFile("./output2.wx", function (err, data) {
    var pathHeadLength = data.readInt32BE(5, 9);
    var filePathsBuffer = data.slice(18, 18 + pathHeadLength);
    var allFilesBufferLength = data.readInt32BE(9, 13);

    var filesData = data.slice(14 + pathHeadLength, 14 + pathHeadLength + allFilesBufferLength);

    var bufferLength = 14 + pathHeadLength;
    var fileStartPos = 0;
    var bufferSize = 4;
    var lastDataLength = 0;
    var lastFileLength = 0;

    while (bufferLength < allFilesBufferLength) {
        var fileLength = filePathsBuffer.readInt32BE(fileStartPos, fileStartPos + bufferSize);

        if (lastFileLength === 0) {
            lastFileLength = 0;
        } else {
            lastFileLength = fileLength + bufferSize * 4;
        }
        console.log(lastFileLength);

        var filePath = filePathsBuffer.slice(fileStartPos + bufferSize, fileStartPos + bufferSize + fileLength);
        var fileDataLength = filePathsBuffer.readInt32BE(lastFileLength + fileLength + bufferSize * 2, lastFileLength + fileLength + bufferSize * 3);

        console.log("---------fileDataLength----------------", fileDataLength);

        var fileData = filesData.slice(lastDataLength, lastDataLength + fileDataLength);
        lastDataLength = fileDataLength;

        lastFileLength = fileLength + bufferSize * 4;
        // fs.writeFile('.' + filePath, fileData, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //
        //     console.log(filePath);
        // });
        fileStartPos = bufferSize * 3 + fileLength + fileStartPos;
        bufferLength = bufferLength + fileStartPos;
    }
});