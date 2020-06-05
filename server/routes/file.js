const express = require('express');
const router = express.Router();

router.get('/:path', (req, res) => {
    res.sendFile(__dirname + '/files/' + req.params.path);
});

module.exports = router;