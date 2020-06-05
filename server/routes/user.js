const express = require('express');
const user = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    user.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
    user.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

module.exports = router;