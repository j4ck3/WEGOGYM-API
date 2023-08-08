const express = require('express')
const controller = express.Router()
const userSchema = require('../schemas/userSchema')
const { authorize } = require('../services/authService')

controller.param("id", async (req, res, next) => {
    user = await userSchema.findById(req.params.id)
    next()
})



controller.route('/')
    .get(async (req, res) => {
        const users = await userSchema.find()
        res.status(200).json(users)
    })


    controller.route("/:id")
    .get(authorize, async (req, res) => {
        if (req.user = !undefined){
            const filteredUser = {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
            res.status(200).json(filteredUser);
        }
        else
            res.status(404).json
    })


    // .get(authorize, async (req, res) => {
    //     if (req.user !== undefined) {
    //         const filteredUser = { ...user };
    //         delete filteredUser.password;
    //         res.status(200).json(filteredUser)
    //     } else {
    //         res.status(401).json({ message: 'Unauthorized' });
    //     }
    // })
    
    .put(authorize, async (req, res) => {
        if (req.user = !undefined) {
            users.forEach(user => {
                if (user.id == req.user.id) {
                    user.email = req.body.email ? req.body.email : body.email
                    user.userName = req.body.userName ? req.body.userName : body.userName
                    user.description = req.body.description ? req.body.description : body.description
                }
                else { res.status(401).json( {mesage: 'You are not authorized to edit this user.'}) }
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