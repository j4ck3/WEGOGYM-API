const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDBConnection = () => {
    mongoose.connect(process.env.mongodb_URI)
} 

module.exports = mongoDBConnection