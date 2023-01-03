require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
const registerRoute = require('./routes/customer.route')
const authRoute = require('./routes/auth.route')



app.use(bodyParser.json())
app.use(registerRoute)
app.use(authRoute)



app.listen(port, () => {
 console.log("aminah is a tech dr")   
})