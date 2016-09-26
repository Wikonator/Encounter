var express = require("express");
var app = express();

app.use(express.static(__dirname + '/Static'));



app.listen(8080);

console.log("I am SO beating your scrawny ass up, ya snot");
