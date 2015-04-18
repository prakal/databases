var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');
var _ = require('underscore');
db.connection.connect();


module.exports = {
  messages: {

    get: function (req, res) {
      var queryString = 'SELECT * FROM messages';
      var collector = [];
      var handler = function(data) {
        console.log("HANDLER " + data);
        // res.end("username: " + data.username + ", message: " + data.message + ", roomname: " + data.roomname)
        res.end(JSON.stringify(data));
      };
      db.connection.query(queryString, function(err, rows, fields) {
      if (err) throw err;

      for (var i in rows) {
        console.log(JSON.stringify(rows[i]));
        collector.push(rows[i]);
      }
      handler(collector);
    });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var obj = {username: req.body.username, message: req.body.message, roomname: req.body.roomname};
      var m = req.body.message.replace("'","''");
      db.connection.query('INSERT INTO messages (username, message, roomname) VALUES (\'' + obj.username + '\',\'' + m + '\',\'' + obj.roomname + '\')');
      res.end();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      res.end();
    },
    post: function (req, res) {
      var obj = {username: req.body.username};
      db.connection.query('INSERT INTO users (username) VALUES (\'' + obj.username + '\')');
      res.end();
    }
  }
};

