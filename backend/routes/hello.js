const express = require('express');
const router = express.Router();
const { hello } = require('../controller/hello');

router.get('/', hello);

module.exports = router;