// ---------------------------------------------------
// Imports
const express = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')

// Configs
const serverConfig = require('./config/server_config')
//Routes
const planRoute = require('./route/plans')
// Classes
// const database = require('./modules/database')
// ---------------------------------------------------

const app = express()

// ---------------------------------------------------
// Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
// ---------------------------------------------------

// ---------------------------------------------------
// Routes
app.use('/plans' , planRoute)
// ---------------------------------------------------

app.get('/',(req,res) => {
  res.send('Server Started')
})

// // ---------------------------------------------------
// Server listening port
app.listen(serverConfig.DEFAULT_PORT,serverConfig.DEFAULT_IP, () => {
    console.log(`Server Listening on IP:${serverConfig.DEFAULT_IP} and PORT:${serverConfig.DEFAULT_PORT}`)
})

// ---------------------------------------------------
