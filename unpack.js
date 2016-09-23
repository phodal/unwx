var fs = require("fs");
var lodash = require("lodash");

fs.readFile("./output.wx", function (err, data) {
    var pathHeadLength = data.readInt32BE(5, 9);
    var filePathsBuffer = data.slice(18, 18 + pathHeadLength);
    var allFilesBufferLength = data.readInt32BE(9, 13);

    var bufferLength = 14 + pathHeadLength;
    var fileStartPos = 0;
    var bufferSize = 4;
    var lastDataLength = 0;
    while (bufferLength < allFilesBufferLength) {
        var fileLength = filePathsBuffer.readInt32BE(fileStartPos, fileStartPos + bufferSize);
        var filePath = filePathsBuffer.slice(fileStartPos + bufferSize, fileStartPos + bufferSize + fileLength);
        var fileDataLength = filePathsBuffer.readInt32BE(fileLength + bufferSize * 2, fileLength + bufferSize * 3);
        var fileData = data.slice(14 + pathHeadLength + lastDataLength, 14 + pathHeadLength + fileDataLength);

        lastDataLength = fileDataLength;

        console.log(fileData.toString());
        fs.writeFile('.' + filePath, fileData, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log(filePath);
        });
        fileStartPos = bufferSize * 3 + fileLength + fileStartPos;
        bufferLength = bufferLength + fileStartPos;
    }
});