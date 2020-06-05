const express = require('express');
const country = require('../models/Country');
const router = express.Router();

router.get('/', (req, res) => {
    country.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
    country.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
})

module.exports = router;