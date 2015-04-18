var express = require('express');
var db = require('./db');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set("port", 3000);

// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use("/classes", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}

// app.get('/',function(req,res){
//   // db.connection.query('INSERT INTO ') /
//   res.end("sdfdsfsdf");
//   console.log("DOING GET NOWZ");
// });

// app.post('/',function(req,res){
//   console.log("DOING POST NOWZ");
//   var valuesArr = [JSON.stringify(req.body.username), JSON.stringify(req.body.message), JSON.stringify(req.body.roomname)];
//   db.connection.query('INSERT INTO messages (username, message, roomname) VALUES', '(\'' + req.body.username + '\',\'' + req.body.message + '\',\'' + req.body.roomname + '\')', function(err) {
//     console.log("+++");
//     if (err) {
//       console.log(err);
//     }
//     db.connection.end();
//   });
// });
