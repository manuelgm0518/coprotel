const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const user = require('../models/User');
const admin = require('../models/Admin');
const office = require('../models/Office');
const router = express.Router();

process.env.SECRET_KEY = 'Joaquín c la come';

router.get('/', (req, res) => {
    user.find({}).populate({path:'location', populate:{path:'state'}}).exec((err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/admin', (req, res) => {
    admin.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/email/:email', (req, res) => {
    user.findOne({email:req.params.email}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            if(data == null){
                admin.findOne({email:req.params.email}, (err, data) => {
                    if(err)
                        res.status(200).json(err);
                    else
                        res.json(data);
                });
            } else {
                res.json(data);
            }
    });
});

router.get('/logIn/verify/:token', (req, res) => {
    let token = req.params.token;
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if(err)
            res.json({unauthorized:true});
        else{
            if(decode.admin){
                admin.findOne({_id:decode._id}, (err, data) => {
                    if(err)
                        res.status(400).json(err);
                    else
                        if(data != null){
                            let send = {
                                email:data.email,
                                lastName:data.lastName,
                                name:data.name,
                                password:data.password,
                                _id:data._id,
                                admin:true
                            }
                            res.json(send);
                        }
                        else
                            res.json({unauthorized:true});
                });
            } else {
                user.findOne({_id:decode._id}).populate({path:'location', populate:{path:'state'}}).exec((err, data) => {
                    if(err)
                        res.status(400).json(err);
                    else
                        if(data != null){
                            let send = {
                                email:data.email,
                                image:data.image,
                                lastName:data.lastName,
                                location:data.location,
                                name:data.name,
                                password:data.password,
                                phone:data.phone,
                                _id:data._id,
                                favorites:data.favorites,
                                admin:false
                            }
                            res.json(send);
                        }
                        else
                            res.json({unauthorized:true});
                });
            }
        }
    });
});

router.post('/favorite/add', (req, res) => {
    user.updateOne({_id:req.body.user}, {$push:{favorites:req.body.office}}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.post('/favorite/quit', (req, res) => {
    user.updateOne({_id:req.body.user}, {$pull:{favorites:req.body.office}}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.post('/', (req, res) => {
    user.findOne({email:req.body.email}, (err, data) => {
        const userData = req.body;
        if(err)
            res.status(400).json(err);
        else
            if(!data){
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    user.create(userData, (err, doc) => {
                        if (err) {
                            res.status(400).json(err);
                            return;
                        }
                        res.json(doc);
                    });
                });
            } else {
                res.json({error:'User already exists'});
            }
    });
});

router.post('/admin', (req, res) => {
    admin.findOne({email:req.body.email}, (err, data) => {
        const adminData = req.body;
        if(err)
            res.status(400).json(err);
        else
            if(!data){
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    adminData.password = hash;
                    admin.create(adminData, (err, doc) => {
                        if (err) {
                            res.status(400).json(err);
                            return;
                        }
                        res.json(doc);
                    });
                });
            } else {
                res.json({error:'Admin already exists'});
            }
    });
});

router.post('/image/:id', (req, res) => {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        console.log(filename);
        user.updateOne({_id:req.params.id}, {$set:{image:filename}}, (err, data) => {
            if(err)
                console.log(err);
            else
                console.log(data);
        });
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.status(200).json({});
        });
    });
});

router.post('/logIn', (req, res) => {
    user.findOne({
        email: req.body.email
    }).then(data => {
        if (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                const payload = {
                    _id: data._id,
                    admin:false
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY);
                res.send(token);
            } else {
                res.json({error:'Incorrect password'});
            }
        } else {
            admin.findOne({
                email: req.body.email
            }).then(data => {
                if (data) {
                    if (bcrypt.compareSync(req.body.password, data.password)) {
                        const payload = {
                            _id: data._id,
                            admin:true
                        };
                        let token = jwt.sign(payload, process.env.SECRET_KEY);
                        res.send(token);
                    } else {
                        res.json({error:'Incorrect password'});
                    }
                } else {
                    res.json({error:'Incorrect password'});
                }
            }).catch(err => {
                res.json({error:'Incorrect password', log:err});
            });
        }
    }).catch(err => {
            res.json({error:'Incorrect password', log:err});
    });
});

router.delete('/:id', (req, res) => {
    office.updateMany({'rents.lessee':req.params.id},{$pull:{rents:{'lessee':[req.params.id]}}}, (err, data) => {
        if(err){
            res.status(400).json(err);
        }
        else{
            office.deleteMany({owner:req.params.id}, (err, data) => {
                if(err)
                    res.status(400).json(err);
                else{
                    user.deleteMany({_id:req.params.id}, (err, data) => {
                        if(err)
                            res.status(400).json(err);
                        else
                            res.json(data);
                    });
                }
            });
        }
    });
});

module.exports = router;