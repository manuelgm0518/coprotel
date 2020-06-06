const mongoose = require('mongoose');
const user = require('./User');
const municipality = require('./Municipality');
const Schema = mongoose.Schema;

var office = new Schema({
    name:{type:String, required:[true, 'No office name']},
    description:{type:String, required:[true, 'No office description']},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:user, required:[true, 'No office owner']},
    location:{type:mongoose.Schema.Types.ObjectId, ref:municipality, required:[true, 'No office location']},
    rentAmount:{type:Number, default:0},
    contact:{type:String, required:[true, 'No office contact']},
    area:{type:Number, default:0},
    capacity:{type:Number, default:0},
    images:[{type:String, require:[true, 'No office images']}],
    date:{type:Date, default:Date.now},
    rents:[{
        lessee:{type:mongoose.Schema.Types.ObjectId, ref:user, required:[true, 'No office rents lesse']},
        date:{type:Date, default:Date.now}
    }],
    keywords:[{type:String, required:[true, 'No office keyword']}]
});

module.exports = mongoose.model('office', office);