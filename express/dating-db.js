var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/datingDB';
mongoose.connect(dbURI);

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    dob: {type: String, required: true},
    favColor: {type: String},
    country: {type: String},
});

mongoose.model('user', userSchema, 'users');


mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});