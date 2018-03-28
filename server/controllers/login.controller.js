const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  loginFB: (req, res) => {
    const idFB = req.body.idFB;
    const email = req.body.email;
    const fbToken = req.body.fbToken;
    const imgUrl = req.body.imgUrl;
    const username = req.body.username;
    User.findOne({ 'email': email })
    .exec()
    .then(dataUser => {
      console.log(dataUser);
      if (dataUser) {
          User.update({'email': email}, { $set: { profilImg:  imgUrl}}, (err, data)=>{
              if(err){
                  return res.status(500).json({
                      message: 'Server error',
                      err: err
                  })
              }
          })
          const token = jwt.sign({ email: dataUser.email, fbToken: fbToken }, process.env.JWTSECRET)
          res.status(200).json({
              data: dataUser,
              token: token
          })
      } else {
          const newUser = new User({
              email: email,
              facebookId: idFB,
              profilImg: imgUrl,
              username: username
          })
          newUser.save((err, data) => {
              const token = jwt.sign({ email: email, fbToken: fbToken }, process.env.JWTSECRET)
              res.status(200).json({
                  token: token,
                  dataUser: data
              })
          })
        }
    })
  }, 
  
  sign_up: (req,res) => {
    const hash = bcrypt.hashSync(req.body.password, salt);
    let newUser = {
      name      : req.body.name,
      password  : hash,
      email     : req.body.email
    }
    User.create(newUser)
    .then(newList => {
      res.status(200).json({
        message : "sucessfully add new user",
        data    : newList
      })
    })
  },

  sign_in: (req,res) => {
    console.log(req.body.email);
    User.findOne({email: req.body.email})
    .exec()
    .then(user => {
      if (user) {
        console.log(user.password);
        console.log(req.body.password);
        console.log(user.password === req.body.password);
        let checkPass = bcrypt.compareSync(req.body.password, user.password)
        if (checkPass) {
          const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET)
          res.status(201).json({
            message : "login success",
            token
          })
        } else {
          res.status(404).json({
            message : "password incorrect"
          })
        }
      } else {
        res.status(404).json({
          message : "email incorrect"
        })
      }
    })
  }
}
