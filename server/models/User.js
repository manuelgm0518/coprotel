const mongoose = require('mongoose');
const municipality = require('./Municipality.js');
const Schema = mongoose.Schema;

var user = new Schema({
    name:{type:String, require:[true, 'No user name']},
    lastName:{type:String, required:[true, 'No user last name']},
    email:{type:String, require:[true, 'No email']},
    password:{type:String, require:[true, 'No password']},
    phone:{type:String}, //+52 1 449 125 0879
    location:{type:mongoose.Schema.Types.ObjectId, ref:municipality, required:[true, 'No user location']},
    image:{type:String, default:'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png'},
    favorites:[{type:String, require:[true, 'No favorite office']}]
});

module.exports = mongoose.model('user', user);