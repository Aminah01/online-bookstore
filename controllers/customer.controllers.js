require('dotenv').config()
const { validateRegistration } = require("../validations/register.validation")
const { customer, otp } = require("../models")
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword, generateOtp } = require('../utilities') 
const { sendEmail } = require("../services/email")


const register = async (res, req) =>{

    const {error, value} = validateRegistration(req.body)

    if (error != undefined) throw new Error (
        res.status(400).json({
            status:false,
            message: error.details[0].message
        })
    )
    const { lastName,firstName,username,  email, phone, password, repeat_password} = req.body;
    const customer_id = uuidv4()
    const _otp = generateOtp()

    try{
        await customer.findAll({
            where:{
                [Op.or] : [
                    {email:email},
                    {phone:phone}
                ]
            }
        })
                    
        if (data.length > 0) throw new Error ('Email or password already exist')
        await hashMyPassword(password)
        await customer.create({
            customer_id: customer_id,
            firstName: firstName,
            lastName: lastName,
            username:username,
            email: email,
            phone_number: phone,
            password_hash: hash,
            password_salt: salt,
        })
        await otp.create({
            otp:_otp,
            email:email,
            phone:phone
        })
        await sendEmail(email, 'OTP', `Hello ${firstName} your otp is ${_otp}`)
        res.status(200).send({
            status:true,
            message: 'Registration succuesful, an otp has been sent to your email'
        })
    }catch (error) {
            console.log("error: ", error)
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred while creating the Customer."
            })
        }
    


}


module.exports = { register }