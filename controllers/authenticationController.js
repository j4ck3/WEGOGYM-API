const express = require('express')
const bcrypt = require('bcryptjs')
const controller = express.Router()
const userSchema = require('../schemas/userSchema')
const { generateAccessToken } = require('../middlewares/authService')

controller.route('/signup').post(async (req, res) => {
    const { userName, email, password } = req.body

    if (!userName || !email || !password)
        return res.status(400).json({msg: 'Please fill in all the fields.'})

    const exists = await userSchema.findOne({ email })
    if (exists){
        return res.status(409).json({msg: 'A user with the same e-mail already exists.'})
    }
      
    else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await userSchema.create({
            userName,
            email,
            password: hashedPassword
        })
        if (user)
            res.status(201).json('Your accout was created.')
        else
            return res.status(500).json({msg: 'Something went wrong. We could not register you right now.'})
    }
})


controller.route('/signin').post(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password)
        return res.status(400).json({msg: 'Please fill in the fields.'})

    const user = await userSchema.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = generateAccessToken(user._id)
         return res.status(200).json({
            text: 'Login successfull!',
            accessToken: accessToken,
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
        })

    } else {
        return res.status(400).json({msg: 'The email or password is incorrect.'})
    }


})

module.exports = controller