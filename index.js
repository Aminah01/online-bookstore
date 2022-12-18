require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT
const bodyParser = require('body-parser')
const LoginRoute = require('./routes/Login')






app.use(bodyParser.json())
app.use(LoginRoute)




app.listen(port, () => {
    console.log(`App is Listening on Port ${port}`)
    
})