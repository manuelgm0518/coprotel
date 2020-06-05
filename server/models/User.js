const mongoose = require('mongoose');
const state = require('./State.js');
const Schema = mongoose.Schema;

var user = new Schema({
    name:{type:String, require:[true, 'No user name']},
    email:{type:String, require:[true, 'No email']},
    password:{type:String, require:[true, 'No password']},
    phone:{type:String}, //+52 1 449 125 0879
    location:{type:mongoose.Schema.Types.ObjectId, ref:state, required:[true, 'No user location']},
});

module.exports = mongoose.model('user', user);