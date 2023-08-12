const jwt = require('jsonwebtoken')

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

const authorize = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            jwt.verify(accessToken, process.env.JWT_SECRET)
            next()
        } catch {
             return res.status(401).json()
        }
    } else {
        return res.status(401).json()
    }
}


const authorizeRole = (role) => {
 return (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({msg: 'Access Denied'})
    }
    next()
 }
}


module.exports = { generateAccessToken, authorize, authorizeRole } 