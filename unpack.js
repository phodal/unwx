var fs = require("fs");
var lodash = require("lodash");

fs.readFile("./output.wx", function (err, data) {
    var pathHeadLength = data.readInt32BE(5, 9);
    var filePathsBuffer = data.slice(18, 18 + pathHeadLength);
    var allFilesBufferLength = data.readInt32BE(9, 13);
    // var pathWithPacketHeadBuffer = data.slice(13, 13 + pathHeadLength);
    // var fileNumbers = data.readInt32BE(14, 18);
    //

    var firstFilesLength = filePathsBuffer.readInt32BE(0, 4);
    var firstFilePath = filePathsBuffer.slice(4, 4 + firstFilesLength);
    console.log(8 + firstFilesLength , 8 + firstFilesLength + 4);
    var fileDataLengthBuffer = filePathsBuffer.readInt32BE(8 + firstFilesLength , 8 + firstFilesLength + 4);

    console.log(firstFilesLength);
    console.log(fileDataLengthBuffer);
    console.log(14 + pathHeadLength, 14 + pathHeadLength + fileDataLengthBuffer);
    // console.log(data.slice(14 + pathHeadLength, 14 + pathHeadLength + fileDataLengthBuffer).toString());
    //
    // var firstBufferLenght = 12 + firstFilesLength;
    //
    // var firstFilesLength = filePathsBuffer.readInt32BE(firstBufferLenght, firstBufferLenght + 4);
    // var firstFilePath = filePathsBuffer.slice(firstBufferLenght + 4, firstBufferLenght + 4 + firstFilesLength);
    //
    // console.log(firstFilesLength);
    // console.log(fileDataLengthBuffer);

    var bufferLength = 14 + pathHeadLength;
    var fileStartPos = 0;
    var bufferSize = 4;
    while (bufferLength < allFilesBufferLength) {
        console.log("----------------------");
        var fileLength = filePathsBuffer.readInt32BE(fileStartPos, fileStartPos + bufferSize);
        var filePath = filePathsBuffer.slice(fileStartPos + bufferSize, fileStartPos + bufferSize + fileLength);
        console.log(filePath.toString());

        console.log(fileLength + bufferSize * 2, fileLength + bufferSize * 3 );
        var fileDataLength = filePathsBuffer.readInt32BE(fileLength + bufferSize * 2, fileLength + bufferSize * 3);
        console.log(fileDataLength);

        console.log(14 + fileStartPos + pathHeadLength, 14 + fileStartPos + pathHeadLength + fileDataLength);
        var fileData = data.slice(14 + fileStartPos + pathHeadLength, 14 + fileStartPos + pathHeadLength + fileDataLength);
        console.log(fileData);

        fileStartPos = bufferSize * 3 + fileLength + fileStartPos;
        bufferLength = bufferLength + fileStartPos;
    }
});