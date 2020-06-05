const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var country = new Schema({
    name:{type:String, required:[true, 'No country name']}
})

module.exports = mongoose.model('country', country);