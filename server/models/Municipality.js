const mongoose = require('mongoose');
const state = require('./State.js');
const Schema = mongoose.Schema;

var municipality = new Schema({
    name:{type:String, required: [true, 'No municipality name']},
    state:{type:mongoose.Schema.Types.ObjectId, ref:state}
})

module.exports = mongoose.model('municipality', municipality);