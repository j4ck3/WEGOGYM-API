const express = require('express')
const controller = express.Router()
const userSchema = require('../schemas/userSchema')
const { authorize, authorizeRole } = require('../middlewares/authService')

controller.param("id", async (req, res, next) => {
    user = await userSchema.findById(req.params.id)
    next()
})


controller.route('/')
    .get(authorizeRole("ADMIN"), async (req, res) => {
        const users = await userSchema.find()
        if (users)
            return res.status(200).json(users)
        else{
            return res.status(200).json({msg: 'Error: No users found'}) 
        }
    })


    controller.route("/:id")
    .get(authorize, async (req, res) => {
        if (req.user = !undefined){
            const filteredUser = {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
            return res.status(200).json(filteredUser);
        }
        else
            return res.status(404).json
    })
    
    .put(authorize, async (req, res) => {
        if (req.user = !undefined) {
            users.forEach(user => {
                if (user.id == req.user.id) {
                    user.email = req.body.email ? req.body.email : body.email
                    user.userName = req.body.userName ? req.body.userName : body.userName
                    user.description = req.body.description ? req.body.description : body.description
                }
                else {  return res.status(401).json( {mesage: 'You are not authorized to edit this user.'}) }
            })
            res.status(200).json(req.user)
        }
        else
            res.status(404).json()
    })


    .delete(authorize, async (req, res) => {
        if (!req.params.id)
            res.status(400).json()
        else {
            if (user) {
                await userSchema.findByIdAndDelete(req.params.id)
                res.status(200).json({ text: 'User was deleted' })
            } else {
                res.status(404).json({ text: 'User was not found' })
            }
        }
    })

module.exports = controller