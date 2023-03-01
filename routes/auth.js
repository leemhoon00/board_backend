const express= require('express');
const jwt = require('jsonwebtoken');

const { join, login, test } = require('../controllers/auth');

const router = express.Router();

router.post('/join', join);

router.post('/login', login);

router.post('/test', test);

module.exports = router;