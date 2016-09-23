"use strict";
function init() {
    var glob = require("glob"), fs = require("fs"), path = require("path"), log = { info: console.log};

    pack = function(projectPath, zipPath, callback) {
        var c = 0, o = 1, a = 2, B = 3, w = 4, packetHead = [new Buffer(1), new Buffer(4), new Buffer(4), new Buffer(4), new Buffer(1)];
        packetHead[c].writeIntLE(190), packetHead[o].writeInt32BE(1), packetHead[w].writeIntLE(237);

        var fileNumber = 0, v = [], h = [], relativePaths = [], fileDatas = [], E = [];
        glob(projectPath + "/**", {nodir: !0}, function(size, files) {
            size ? log.error(size) : !function() {
                fileNumber = files.length, files.forEach(function(file) {
                    var data = fs.readFileSync(file),
                        relativePath = path.relative(projectPath, file),
                        pathWithReplace = new Buffer("/" + relativePath.replace(/\\/g, "/"));

                    relativePaths.push(pathWithReplace);
                    fileDatas.push(data);
                });

                var packetLength = 18 + 12 * fileNumber + Buffer.concat(relativePaths).length;
                h = relativePaths.map(function(r, n) {
                    console.log(r, n);
                    var t = new Buffer(4);
                    t.writeInt32BE(r.length);
                    var f = new Buffer(4), u = fileDatas[n].length, i = packetLength;
                    f.writeInt32BE(i), packetLength += u;
                    var c = new Buffer(4);
                    return c.writeInt32BE(u), Buffer.concat([t, r, f, c])
                });

                var o = new Buffer(4);
                o.writeInt32BE(fileNumber);
                h.unshift(o);
                v = Buffer.concat(h);
                E = Buffer.concat(fileDatas);
                packetHead[a].writeInt32BE(v.length);
                packetHead[B].writeInt32BE(E.length);
                packetHead = Buffer.concat(packetHead);

                var zipData = Buffer.concat([packetHead, v, E]);
                console.log(zipData);
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

