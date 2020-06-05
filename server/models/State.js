const mongoose = require('mongoose');
const country = require('./Country.js');
const Schema = mongoose.Schema;

var state = new Schema({
    name:{type:String, required:[true, 'No state name']},
    country:{type:mongoose.Schema.Types.ObjectId, ref:country}
})

module.exports = mongoose.model('state', state);