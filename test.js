var pack = require("./pack");

console.log("--------------------------start--------------------------");
pack("/Users/fdhuang/learing/wx/test/", "/Users/fdhuang/learing/wx/output.wx", function(a, zipPath){
	console.log("--------------------------output--------------------------");
	console.log(zipPath);
});