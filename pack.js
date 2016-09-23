"use strict";
function init() {
    var glob = require("glob"), fs = require("fs"), path = require("path"), log = {
        info: console.log,
        error: console.log
    };

    pack = function (projectPath, zipPath, callback) {
        var startIndex = 0, first = 1, second = 2, third = 3, four = 4, packetHead = [new Buffer(1), new Buffer(4), new Buffer(4), new Buffer(4), new Buffer(1)];
        packetHead[startIndex].writeIntLE(190), packetHead[first].writeInt32BE(1), packetHead[four].writeIntLE(237);
        console.log(packetHead);

        var fileNumber = 0, pathWithPacketHeadBuffer = [], pathWithPacketHead = [], relativePaths = [], fileDatas = [], fileDatasBuffer = [];
        glob(projectPath + "/**", {nodir: !0}, function (size, files) {
            size ? log.error(size) : !function () {
                fileNumber = files.length;
                files.forEach(function (file) {
                    var data = fs.readFileSync(file),
                        relativePath = path.relative(projectPath, file),
                        pathWithReplace = new Buffer("/" + relativePath.replace(/\\/g, "/"));

                    relativePaths.push(pathWithReplace);
                    fileDatas.push(data);
                });

                var packetLength = 18 + 12 * fileNumber + Buffer.concat(relativePaths).length;
                pathWithPacketHead = relativePaths.map(function (path, index) {
                    var pathLength = new Buffer(4);
                    pathLength.writeInt32BE(path.length);
                    var currentPacketLengthBuffer = new Buffer(4), fileDataLength = fileDatas[index].length, currentPacketLength = packetLength;
                    currentPacketLengthBuffer.writeInt32BE(currentPacketLength), packetLength += fileDataLength;
                    var fileDataLengthBuffer = new Buffer(4);
                    return fileDataLengthBuffer.writeInt32BE(fileDataLength), Buffer.concat([pathLength, path, currentPacketLengthBuffer, fileDataLengthBuffer])
                });

                var filesNumberBuffer = new Buffer(4);
                filesNumberBuffer.writeInt32BE(fileNumber);
                pathWithPacketHead.unshift(filesNumberBuffer);

                pathWithPacketHeadBuffer = Buffer.concat(pathWithPacketHead);
                fileDatasBuffer = Buffer.concat(fileDatas);

                packetHead[second].writeInt32BE(pathWithPacketHeadBuffer.length);
                packetHead[third].writeInt32BE(fileDatasBuffer.length);
                packetHead = Buffer.concat(packetHead);

                var zipData = Buffer.concat([packetHead, pathWithPacketHeadBuffer, fileDatasBuffer]);
                fs.writeFileSync(zipPath, zipData);

                log.info("pack.js create " + zipPath + " success!");
                callback(null, zipPath);
            }()
        })
    }
}

var pack;
init();
module.exports = pack;

