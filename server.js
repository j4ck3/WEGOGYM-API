require('dotenv').config()
const port = process.env.API_PORT || 4000
const mongoDBConnection = require('./mongodb-server')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())



app.use('/api/authentication', require('./controllers/authenticationController'))
app.use('/api/user', require('./controllers/userController'))

app.listen(port, () => {
    console.log(`localhost:${port}/api`)
    mongoDBConnection()
})

// const { graphqlHTTP } = require('express-graphql')
// app.use('/graphql', graphqlHTTP({
//     schema: require('./schemas/graphQL/graphQLSchema'),
//     graphiql: true
// }))