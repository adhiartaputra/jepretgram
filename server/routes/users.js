const express = require('express')
const router = express.Router()

const {getUserDetail, getUser, deleteUser} = require('../controllers/user.controller')

router.post('/:id', getUserDetail);
router.get('/', getUser);
router.delete('/:id', deleteUser)

module.exports = router
