const jwt = require('jsonwebtoken');

function getJWT (req, res, next) {
  const fbData = req.response;
  const token  = jwt.sign(date, process.env.JWTSECRET)
  req.token = token ;
  next();
}

function decodeJWT (req, res, next) {
  if (!req.body.token) {
    return res.status(401).json({
      message: 'You are not authorized. Please Login.',
      status: 'unauthorized'
    })
  }
  try {
    jwt.verify(req.body.token, process.env.JWTSECRET, function(err, decoded) {
      req.decoded = decoded;
      next()
    })
  } catch (e) {
    res.status(500).json({
      err: e
    });
  }
}

// function authJWT (req, res, next) {
//   if (req.token !== undefined) {
//     res.status(401).json({
//       message:'You are not logged in. No token'
//     })
//   } else {
//     next()
//   }
// }

module.exports = {
  getJWT: getJWT,
  decodeJWT: decodeJWT
}
