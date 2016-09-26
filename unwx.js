#!/usr/bin/env node

var fs = require("fs");
var lodash = require("lodash");
var filendir = require('filendir');
var program = require('commander');

var bufferSize = 4;
var packetHeadLength = 14;

function unwx(inputPath, outputPath){
    fs.readFile(inputPath, function (err, data) {
        var pathHeadLength = data.readInt32BE(bufferSize + 1, bufferSize * 2 + 1);
        var filePathsBuffer = data.slice(packetHeadLength + bufferSize, packetHeadLength + bufferSize + pathHeadLength);
        var allFilesBufferLength = data.readInt32BE(bufferSize * 2 + 1, bufferSize * 3 + 1);

        var filesData = data.slice(packetHeadLength + pathHeadLength, packetHeadLength + pathHeadLength + allFilesBufferLength);
        var filePathsBufferWithoutHead = filePathsBuffer.slice(bufferSize, filePathsBuffer.length);

        while (filePathsBuffer.length > 0) {
            var fileLength = filePathsBuffer.readInt32BE(0, bufferSize);
            var filePath = filePathsBuffer.slice(bufferSize, bufferSize + fileLength);

            var filePathsBufferWithoutCurrentPath = filePathsBuffer.slice(fileLength + bufferSize, filePathsBufferWithoutHead.length);

            var currentBufferLength = filePathsBufferWithoutCurrentPath.readInt32BE(0, bufferSize + 1);
            var currentFileDataBuffer = filePathsBufferWithoutCurrentPath.readInt32BE(bufferSize, bufferSize * 2);
            filesData = data.slice(currentBufferLength, data.length);

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

program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-i, --input <n>', 'Input Dir')
    .parse(process.argv);

console.log('input:', program.input);

if(program.input) {
    unwx(program.input, __dirname);
}


