require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {customer}= require('../models')
const {validateLogin} = require('../validations/register.validation')





const Login = async (res, req) =>{

    const {email,password} = validateLogin(req.body)

    try {
        const user = await customer.findAll( { where: { email: email } } )

        if (user.length==0) {
            throw new Error `Email or Phone Number is Incorrect`
        }
        const passwordHashFromDB = user[0].dataValues.password_hash
        const passwordCompare =  await bcrypt.compare(password, passwordHashFromDB)

        if (passwordCompare == false) {
            throw new Error `Email or Phone is Incorrect`
        }
        
    } catch (e) {
        res.status(400).json({
            status:false,
            message:e.message
        })
    }       
    const Token = jwt.sign({
        data: {
            email:email,
            customer_id:user[0].dataValues.customer_id,
            phone:user[0].dataValues.phone,
            firstname:user[0].dataValues.firstname,
            lastname:user[0].dataValues.lastname
        }
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });

    res.setHeader('Token', Token)

    res.status(200).json({
        status:true,
        Token:Token,
        Message:'Successfully Log In'
    })
    



}





module.exports = { Login }