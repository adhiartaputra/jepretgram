const express = require('express')
const router = express.Router()

const {loginFB, sign_up, sign_in} = require('../controllers/login.controller')

// router.post('/', loginFB)
router.post('/', sign_in)
router.post('/signup', sign_up)

module.exports = router
