const express = require('express');
var fs = require('fs');
const office = require('../models/Office');
const router = express.Router();

router.post('/', (req, res) => {
    office.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/', (req, res) => {
    office.find({}).sort([['description',1]]).exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.post('/image', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        /*var ids = req.params.ids.split('$');
        Vacant.findOneAndUpdate({ "_id": ids[1]},{ "$push": { "requests": {user:ids[0], fileURL:'http://189.168.127.125/api/img/' + filename} } }, (err, data) => {
            if(err)
                console.log(err);
        });*/
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).json({});
        });
    });
});

module.exports = router;