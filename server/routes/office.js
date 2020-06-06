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

router.post('/image/:id', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        console.log(req.params.id);
        office.updateOne({_id:req.params.id}, {$push:{images:filename}}, (err, data) => {
            if(err)
                console.log(err);
        });
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).json({});
        });
    });
});

router.get('/:id', (req, res) => {
    office.findOne({_id:req.params.id}).populate({path:'location', populate:{path:'state'}}).exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;