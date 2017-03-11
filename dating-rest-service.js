var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var path = require("path");

var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

require('./db.js');

var USERS = mongoose.model('user');

app.use(bodyParser.json());

app.get('/users', function(req, res) {
    USERS.find({}, 'name gender age dob country', function(err, users) {
        console.log('got users list: ' + JSON.stringify(users));
        res.send(users);
    });
});

app.get('/users/:rollno', function(req, res) {
    console.log('Requested Roll is: ' + req.params.rollno);
    USERS.find({rollno: req.params.rollno}, 'rollno name', function(err, users) {
        if(users != null && users.length > 0) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
});

app.post('/users', function(req, res) {
    var newUser = req.body;
    console.log('newStd: ' + JSON.stringify(newUser));
    USERS.create(newUser, function(err, newUser) {
        res.sendStatus(201);
    });
});

app.delete('/users/:rollNo', function(req, res) {
    console.log('Requested Roll to delete: ' +req.params.rollNo);
    var matchingIndex = -1;
    users.forEach(function(std, index) {
        if(std.roll == req.params.rollNo) {
            matchingIndex = index;
        }
    });
    if(matchingIndex !== -1) {
        users.splice(matchingIndex, 1);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.put('/users/:rollno', function(req, res) {
    var newUser = req.body;
    console.log('Requested Roll to update: ' +req.params.rollno);
    USERS.update({rollno: req.params.rollno}, newUser, {multi: false}, function(err, raw) {
        console.log('Raw: ' + JSON.stringify(raw));
        if(!err && raw.ok === 1 && raw.nModified === 1 && raw.n === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(8040, function() {
    console.log("App started on port 8040");
});