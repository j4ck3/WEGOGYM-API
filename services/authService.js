const jwt = require('jsonwebtoken')

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

const authorize = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_SECRET)
            next()
        } catch {
            res.status(401).json()
        }
    } else {
        res.status(401).json()
    }
}
module.exports = { generateAccessToken, authorize } 