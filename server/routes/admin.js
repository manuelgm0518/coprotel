const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const admin = require('../models/Admin');
const router = express.Router();

process.env.SECRET_KEY = 'Joaquín c la come';

router.get('/', (req, res) => {
    admin.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
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
    admin.findOne({
        email: req.body.email
    }).then(data => {
        if (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                const payload = {
                    _id: admin._id
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
});

module.exports = router;