const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/User');
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

router.post('/logIn', (req, res) => {
    user.findOne({
        email: req.body.email
    }).then(data => {
        if (data) {
            if (bcrypt.compareSync(req.body.password, data.password)) {
                const payload = {
                    _id: user._id
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