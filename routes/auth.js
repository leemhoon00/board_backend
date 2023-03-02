const express= require('express');

const { join, login, test, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/join', join);

router.post('/login', login);

router.post('/test', test);

router.get('/test', logout);

module.exports = router;