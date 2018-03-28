const User = require('../models/user.model');
const Files = require('../models/file.model');
const moment = require('moment');

module.exports = {
  create: (req, res) => {
    User.findOne({_id: req.params.id})
      .exec()
      .then(foundUser => {
        console.log(foundUser);
        console.log(file);
        let file = {
          filePath: req.file.imgUrl,
          mimeType: req.file.mimetype,
          user: foundUser._id,
          description: req.body.description
        }
        Files.create(file, (err, data) => {
            // update user here
          foundUser.files.push(data._id);
          foundUser.save().then((User) => {
              if (err) {
                  console.log(err);
                  return res.status(400).json({
                      message: err.message
                  })
              }
              res.status(200).json({
                  message: 'New file inserted',
                  data
              })
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Server error',
          err: err
        })
      })
  },
  findAll: (req, res) => {
      Files.find()
          .populate('user')
          .populate('likes')
          .sort({createdAt: 'desc'})
          .exec()
          .then((data) => {
              let sendData = []
              moment().format();
              for(let i=0; i<data.length; i++){
                  let obj = {};
                  obj.description = data[i].description;
                  obj.likes = data[i].likes;
                  obj.createdAt = data[i].createdAt;
                  obj.updatedAt = data[i].updatedAt;
                  obj._id = data[i]._id;
                  obj.filePath = data[i].filePath;
                  obj.mimeType = data[i].mimeType;
                  obj.user = data[i].user;
                  obj.dateFromNow = moment(data[i].createdAt).fromNow();
                  sendData.push(obj)
              }
              res.status(200).json({
                  message: 'Success get all data !',
                  data : sendData
              })
          })
          .catch(err => {
              console.log(err);
              res.status(400).json({
                  message: err.message
              })
          })
  },
  findById: (req, res) => {
      Files.findOne({
          _id: req.params.id
      })
          .populate('user')
          .populate('likes')
          .exec()
          .then((data) => {
              res.status(200).json({
                  message: 'Success get data !',
                  data
              })
          })
          .catch(err => {
              console.log(err);
              res.status(400).json({
                  message: err.message
              })
          })
  },
  like: (req, res) => {
      const userId = req.user._id;
      Files.findOne({ _id: req.params.fileId })
          .exec()
          .then((data) => {
              let updateLike = data.likes;
              updateLike.push(userId);
              Files.findByIdAndUpdate(req.params.fileId, {
                  likes: updateLike
              }, { new: true }, (err, data2) => {
                  if (err) {
                      return res.status(400).json({
                          message: 'Failed to update'
                      })
                  }
                  res.status(200).json({
                      message: 'Updated',
                      data: data2
                  })
              })
          })
          .catch(err => {
              console.log(err)
          })
  },
  destroy: (req, res) => {
    const id = req.params.fileId
    Files.remove({ _id: id }, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                message: err.message
            })
        }
        res.status(200).json({
            message: 'Item deleted',
        })
    })
  },

  findOneAndNext: (req, res, next) => {
      const id = req.params.fileId
      Files.findOne({_id:id})
        .exec()
        .then(foundFile => {
          req.toDelete = foundFile;
          next()
        })
        .catch(err => {
          res.status(404).json({
            message: 'File not found.',
            err: err
          })
        })
  }
}
