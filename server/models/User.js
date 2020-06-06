const mongoose = require('mongoose');
const municipality = require('./Municipality.js');
const Schema = mongoose.Schema;

var user = new Schema({
    name:{type:String, require:[true, 'No user name']},
    lastName:{type:String, required:[true, 'No user last name']},
    email:{type:String, require:[true, 'No email']},
    password:{type:String, require:[true, 'No password']},
    phone:{type:String},
    location:{type:mongoose.Schema.Types.ObjectId, ref:municipality, required:[true, 'No user location']},
    image:{type:String, default:''},
    favorites:[{type:String, require:[true, 'No favorite office']}]
});

module.exports = mongoose.model('user', user);