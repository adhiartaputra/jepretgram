const express = require('express');
const router = express.Router();
const {authlogin} = require('../middleware/auth')
const {getUserDetail} = require('../controllers/user.controller');

router.get('/', authlogin, getUserDetail)

module.exports = router;
