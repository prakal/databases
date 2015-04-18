var models = require('../models');
var bluebird = require('bluebird');
var db = require('../db');
var _ = require('underscore');
db.connection.connect();


module.exports = {
  messages: {
    get: function (req, res) {
      console.log("HI DAVID AND KHOA (RAYMOND TOO)");
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
    get: function (req, res) {},
    post: function (req, res) {
      res.writeHead(201);
      res.end();
    }
  }
};

