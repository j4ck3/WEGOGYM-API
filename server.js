require('dotenv').config()
const port = process.env.API_PORT || 4000
const mongoDBConnection = require('./mongodb-server')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())


app.use('/authentication', require('./controllers/authenticationController'))
app.use('/users', require('./controllers/userController'))

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
    mongoDBConnection()
})