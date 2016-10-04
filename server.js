var express = require("express"),
    pg = require("pg"),
    URL = require("url-parse"),
    app = express();

var cookieSession = require('cookie-session');


app.use(express.static(__dirname + '/Static'));
app.use(require("body-parser").urlencoded({
    extended: false
}));
app.use(require("body-parser").json({
    extended: false
}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

var isLoggedIn = function(req,res,next){
    if(!req.session.user){
        res.status(403);
        res.end();
    } else {
        next();
    }
}


function addLink(userID, link, image, description, res, req) {
  var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
  client.connect(function(err) {
    if (err) {
      console.log("no connection happened");
      throw err;
    }
    var input = 'INSERT INTO links (score, link, description, user_id) VALUES ($1, $2, $3, $4) RETURNING id';

    client.query(input, [1, link, description, userID], function(error, results) {
        if (error) {
            console.log(error);
            return res.json({error: "error"});
        }
      client.end();
      res.json("allDone");
    });
  });
}

app.post("/postLink",isLoggedIn, function(req, res, next) {
    // console.log(req.body);
    var here = req.body,
        username = 1;
    function parse(link) {
        var url = new URL(link);
        // console.log(url);
        // console.log(url.protocol);
        return url.protocol;
    }
    var linkProtocol = parse(here.link);
        if ( linkProtocol == "http:" || linkProtocol == "https:") {
            // console.log("its an if!");
        addLink(username, here.link, here.image, here.description, res, req);
    } else {
        // console.log("it's an else!");
        res.json("this is not a valid url!");
    }
})

function getLinksFromDB(res) {
    var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
  client.connect(function(err) {
    if (err) {
      console.log("no connection happened");
      throw err;
    }
    var input = 'SELECT * FROM links';

    client.query(input, function(error, results) {
        if (error) {
            console.log("count connect to database to get this");
            return res.json("name", {error: "That email is already taken, fam!"});
        }
        var myArr = results.rows;
        client.end();
        res.json(myArr);
    });
  });
};

app.get("/getLinks",isLoggedIn, function(req, res, next) {
    getLinksFromDB(res);
})

//comments
app.post("/addComment",isLoggedIn, function(req,res) {
    console.log(req.body)
    var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
    client.connect(function(err){
        if(err){
            throw new Error('please check the connection with the DB');
        }
        
        var query = "INSERT INTO comments (linkId,userName,content,date,likes,disLikes,parent) VALUES ($1,$2,$3,$4,$5,$6,$7) returning *";
        
        client.query(query,[1,req.body.user,req.body.content,req.body.date,req.body.likes,req.body.disLikes,req.body.parent], function(error,result){

            if(error){
                console.log(error)
            }
            res.json(result.rows);
            res.end();
        })
    });
    
    
});

app.get("/getComments",isLoggedIn,function(req,res) {
//    if(!req.session.user) {
//        res.status(404);
//        res.end();
//    }
    var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
    client.connect(function(err){
        if(err){
            throw new Error('please check the connection with the DB');
        }
        
        var query = "SELECT * from comments WHERE linkid = $1";
        client.query(query,[req.query.id],function(err, result){
            if(err){
            console.log(err);
            }
            
            res.json(result.rows);
            res.end();
        })
    })
})
// the end of comments

// auth
app.post("/register", function(req,res) {
    var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
    client.connect(function(err){
        if(err){
            throw new Error('please check the connection with the DB');
        }
        
        var query = "INSERT INTO users (name,email,password) values ($1,$2,$3)";
        client.query(query,[req.body.user,req.body.email,req.body.password],function(err, result){
            if(err){
            console.log(err);
            }
            
            res.json(result.rows);
            res.end();
        })
    })
})


app.get("/login", function(req,res) {
    var client = new pg.Client("postgres://spiced:spiced1@localhost:5432/encounter");
    client.connect(function(err){
        if(err){
            res.error('please check the connection with the DB');
        }
        
        var query = "SELECT * FROM users where email = $1 and password = $2";
        client.query(query,[req.body.email,req.body.password],function(err, result){
            if(err){
            console.log(err);
            }
            req.session.user = {
                loggedin: true
            }
        
            console.log(req.session)
            res.json(result.rows);
            res.end();
        })
    })
})

app.get("/logout", function(req,res) {
    req.session.user = null;
    res.json();
    res.end('logged out');
});
app.listen(8080);
