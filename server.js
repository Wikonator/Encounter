var express = require("express"),
    pg = require("pg"),
    app = express();

app.use(express.static(__dirname + '/Static'));


app.use(require("body-parser").urlencoded({
    extended: false
}));
app.use(require("body-parser").json({
    extended: false
}));

// console.log(require("body-parser"));

app.get("/getLinks", function(req, res, next) {
    console.log("I fired");
    var myArr = [{link:"www.somesime.org",title:"a title"}];

      res.json(myArr);
})

app.post("/postLink", function(req, res, next) {
    console.log(req.body);
    res.json("response");
})

app.listen(8080);

console.log("hey there, wanna buy some links?");
