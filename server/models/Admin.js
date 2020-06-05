const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var admin = new Schema({
    name:{type:String, require:[true, 'No user name']},
    email:{type:String, require:[true, 'No email']},
    password:{type:String, require:[true, 'No password']},
});

module.exports = mongoose.model('admin', admin);