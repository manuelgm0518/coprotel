const express = require('express');
const router = express.Router();

router.get('/:path', (req, res) => {
    res.sendFile(__dirname + '/files/' + req.params.path);
});

router.get('/', (req, res) => {
    res.end();
});

module.exports = router;