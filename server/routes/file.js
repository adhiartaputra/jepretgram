const express = require('express');
const {decodeJWT} = require('../middleware/jwt');
const { memUpload, localUpload } = require('../middleware/multer');
const {googleUpload, googleDelete} = require('../middleware/gcs');
const router = express.Router();

const {create, findAll, findById, like, destroy, findOneAndNext} = require('../controllers/file.controller')
const {verifyUser} = require('../controllers/user.controller')

// TODO change memUpload argument to form input name
// router.post('/create/:id',memUpload.single('image'), decodeJWT, verifyUser, googleUpload, create);
router.post('/create/:id',memUpload.single('image'), googleUpload, create);
router.get('/', findAll);
router.get('/:id', findById);
router.put('/like/:fileId', memUpload.single('image'), decodeJWT, verifyUser, like);
router.delete('/delete/:fileId', findOneAndNext, googleDelete, destroy);
// router.post('/create/:id', localUpload.single('image'))

module.exports = router
