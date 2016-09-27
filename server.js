var express = require("express");
var app = express();

app.use(express.static(__dirname + '/Static'));

app.get("/getLinks", function(req, res, next) {
    console.log("I fired");
    var myArr = [{link:"www.somesime.org",title:"a title"}];

      res.json(myArr);
})

app.listen(8080);

console.log("hey there, wanna buy some links?");
