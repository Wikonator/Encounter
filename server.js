var express = require("express");
var app = express();

app.use(express.static(__dirname + '/Static'));


app.listen(8080);
