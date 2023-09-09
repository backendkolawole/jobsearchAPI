const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')
const bcrypt = require('bcryptjs')

const register = async (req, res)=> {
    const user = await User.create(req.body)
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

const login = async (req, res)=> {
    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const isCorrect = await user.comparePasswords(password)
    if (!isCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = await user.createJWT()

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}



module.exports = {login, register}