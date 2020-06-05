const express = require('express');
const admin = require('../models/Admin');
const router = express.Router();

router.get('/', (req, res) => {
    admin.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
    admin.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

module.exports = router;