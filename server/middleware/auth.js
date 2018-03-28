const jwt = require('jsonwebtoken');

module.exports = {
    authlogin(req, res, next) {
        if (req.headers.token !== 'null') {
            const token = req.headers.token
            let decode = null
            decode = jwt.verify(token, process.env.SECRET)
            next()
        } else {
            next('error')
        }
    }
}
