const express = require('express');
const state = require('../models/State');
const router = express.Router();

router.get('/', (req, res) => {
    state.find({}, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
});

router.post('/', (req, res) => {
    state.create(req.body, (err, data) => {
        if(err)
            res.status(400).json(err);
        else
            res.json(data);
    })
})

module.exports = router;