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
    .get(authorize, (req, res) => {
        if (req.user = !undefined)
            res.status(200).json(req.user)
        else
            res.status(404).json
    })
    .put(authorize, (req, res) => {
        if (req.user = !undefined) {
            users.forEach(user => {
                if (user.id == req.user.id) {
                    user.firstName = req.body.firstName ? req.body.firstName : body.firstName
                    user.lastName = req.body.lastName ? req.body.firstName : body.lastName
                    user.email = req.body.email ? req.body.firstName : body.email
                }
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