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
    office.find({}).sort([['description',1]]).populate({path:'location', populate:{path:'state'}}).exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.post('/favorites', async (req, res) => {
    var send = [], err, data;
    for(var ofi of req.body.offices){
        err, data = await office.findOne({_id:ofi});
        if(err)
            break;
        send.push(data);
    }
    if(err)
        res.status(400).json(err);
    else
        res.json(send);
});

router.post('/request/add', (req, res) => {
    office.findOne({rents:{$elemMatch:{lessee:req.body.user}}}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            if(!data){ //Falta fixear la fecha
                office.updateOne({_id:req.body.office}, {$push:{rents:{lessee:req.body.user}}}, (err, data) => {
                    if(err)
                        res.status(400).json(err);
                    else
                        res.json(data);
                });
            } else {
                res.json({error:'exits'});
            }
    });
});

router.post('/request/accept', (req, res) => {
    office.updateOne({_id:req.body.office, 'rents.requestDate':req.body.office},{$set:{startDate:Date.now()}}, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json(err);
        }
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

router.get('/user/:id', (req, res) => {
    office.find({owner:req.params.id}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/rents/user/:id', (req, res) => {
    office.find({"rents.lessee":req.params.id}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});


router.delete('/:id', (req, res) => {
    office.deleteOne({_id:req.params.id}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/:id', (req, res) => {
    office.findOne({_id:req.params.id}).populate({path:'location', populate:{path:'state'}}).populate('rents.lessee').exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;