const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var state = new Schema({
    name:{type:String, required:[true, 'No state name']},
})
///
module.exports = mongoose.model('state', state);