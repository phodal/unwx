var fs = require("fs");
var lodash = require("lodash");
var filendir = require('filendir');

function unpack(inputPath, outputPath){
    fs.readFile(inputPath, function (err, data) {
        var pathHeadLength = data.readInt32BE(5, 9);
        var filePathsBuffer = data.slice(18, 18 + pathHeadLength);
        var allFilesBufferLength = data.readInt32BE(9, 13);

        var filesData = data.slice(14 + pathHeadLength, 14 + pathHeadLength + allFilesBufferLength);

        var bufferSize = 4;
        var filePathsBufferWithoutHead = filePathsBuffer.slice(4, filePathsBuffer.length);

        var dataForParse = data;
        while (filePathsBuffer.length > 0) {
            var fileLength = filePathsBuffer.readInt32BE(0, 4);
            var filePath = filePathsBuffer.slice(bufferSize, bufferSize + fileLength);

            var filePathsBufferWithoutCurrentPath = filePathsBuffer.slice(fileLength + bufferSize, filePathsBufferWithoutHead.length);

            var currentBufferLength = filePathsBufferWithoutCurrentPath.readInt32BE(0, 5);
            var currentFileDataBuffer = filePathsBufferWithoutCurrentPath.readInt32BE(4, 8);
            filesData = dataForParse.slice(currentBufferLength, data.length);

            var fileData = filesData.slice(0, currentFileDataBuffer);
            filePathsBuffer = filePathsBuffer.slice(fileLength + bufferSize * 3, filePathsBufferWithoutHead.length);
            filendir.wa(outputPath + filePath, fileData, function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
    });
}

unpack("output2.wx", __dirname);
