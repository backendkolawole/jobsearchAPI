const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next)=> {
    let authHeaders = req.headers.authorization
    
    
    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        throw new UnauthenticatedError(`Authentication invalid`)
    }

    const token = authHeaders.split(' ')[1]
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const {userId, name} = decoded
        req.user = {userId, name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid credentials')
    }
}



module.exports = authenticationMiddleware