const express = require('express');
const municipality = require('../models/Municipality');
const router = express.Router();

router.get('/', (req, res) => {
    municipality.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
    municipality.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

router.get('/:state', (req, res) => {
    municipality.find({state:req.params.state}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    });
});

module.exports = router;