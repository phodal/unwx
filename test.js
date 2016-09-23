var pack = require("./pack");

pack("/Users/fdhuang/learing/wx/test/", "/Users/fdhuang/learing/wx/output.wx", function(a, zipPath){
	console.log(zipPath);
});