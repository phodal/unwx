var pack = require("./pack");

console.log("--------------------------start--------------------------");
pack("/Users/fdhuang/learing/unwx/test/", "/Users/fdhuang/learing/unwx/output2.wx", function(a, zipPath){
	console.log("--------------------------output--------------------------");
	console.log(zipPath);
});