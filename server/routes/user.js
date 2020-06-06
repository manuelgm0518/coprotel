const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const admin = require('../models/Admin');
const router = express.Router();

process.env.SECRET_KEY = 'Joaquín c la come';

router.get('/', (req, res) => {
    user.find({}, (err, data) => {
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
                        if(data != null)
                            res.json(data);
                        else
                            res.json({unauthorized:true});
                });
            } else {
                user.findOne({_id:decode._id}, (err, data) => {
                    if(err)
                        res.status(400).json(err);
                    else
                        if(data != null)
                            res.json(data);
                        else
                            res.json({unauthorized:true});
                });
            }
        }
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

module.exports = router;