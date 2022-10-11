const fs = require('fs');
const bodyParser = require("body-parser");
const session = require('express-session');
const express = require('express');
const app = express();
const mysql = require('mysql');
const { connect } = require('http2');


const connection = mysql.createConnection({
	host     : 'containers-us-west-100.railway.app',
	user     : 'root',
	password : '5c24Dfcr42wYngE6mG8p',
	database : 'railway'
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    fs.readFile(__dirname + "/index.html", function(err, data){
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.get('/login', function (req, res) {
    fs.readFile(__dirname + "/login.html", function(err, data){
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.post('/auth', function (req, res) {
    console.log(req.body.user,req.body.passwd);
    console.log(connection.query("SELECT * FROM Users"))
    return res.redirect("/")
});

var server = app.listen(process.env.PORT, function () {
    console.log('Node server is running..');
});
