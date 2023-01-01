require('dotenv').config()
const { validateRegistration } = require("../validations/register.validation")
const { customer, otp } = require("../models")
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword, generateOtp } = require('../utilities') 
const { sendEmail } = require("../services/email")
const { sendSms } = require('../services/sms')


const register = async (req, res) =>{
        // console.log('Hello')
    const {error, value} = validateRegistration(req.body)

    if (error != undefined){
        res.status(400).json({
            status:false,
            message: error.details[0].message
        })
    }
        // console.log(JSON.stringify(req.body))
    const { lastName,firstName,username,  email, phone, password, repeat_password, address} = req.body;
    const customer_id = uuidv4()
    const email_otp = generateOtp()
    const phone_otp = generateOtp()

    try{
       const data = await customer.findAll({
            where:{
                [Op.or] : [
                    {email:email},
                    {phone:phone}
                ]
            }
        })
                    
        if (data.length > 0) throw new Error ('Email or password already exist')
        const [hash, salt ] = await hashMyPassword(password)
        await customer.create({
            customer_id: customer_id,
            firstName: firstName,
            lastName: lastName,
            username:username,
            email: email,
            phone: phone,
            password_hash: hash,
            password_salt: salt,
            address: address,
        })
        await otp.create({
            email_otp:email_otp,
            phone_otp:phone_otp,
            email:email,
            phone:phone
        })
        sendEmail(email, 'OTP', `Hello ${firstName} your otp is ${email_otp}`)
        sendSms(phone, `Your otp is ${phone_otp}`)
        res.status(200).send({
            status:true,
            message: `Registration successful, an otp has been sent to your email and your phone number ending with ...${phone.substr(-4, 4)}`
        })
    }catch (error) {
            console.log("error: ", error)
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred while creating the Customer."
            })
        }
}


const verifyEmailOtp = async (req, res) =>{

    const { email, email_otp } = req.params

    try{
        const emailOtpData = await otp.findAll({
            where:{
                email:email,
                email_otp:email_otp
            },
            attributes: [ 'email_otp', 'email', 'createdAt']
        })
        if( emailOtpData.length == 0) throw new Error
            ("Invalid Otp")
        console.log("emailOtpData",  emailOtpData[0])
        // const timeOtpWasSent = Date.now() - new Date(emailOtpData[0].dataValues.createdAt)
        
        //     const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

        //     if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')
        await customer.update({is_email_verified: true},{
            where: {
                email: email
            }
        })
        
        sendEmail(email, ' Email OTP Verification','Email verification successful')

        res.status(200).send({
            status:true,
            message:`Email verification successful`
        })
    }catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred while verifying OTP."
        })
    }


}

const verifyPhoneOtp = async (req, res) =>{
    const { phone, phone_otp, email } = req.params

    try{
        const phoneOtpData = await otp.findAll({
            where:{
                phone:phone,
                phone_otp:phone_otp,
            },
            attributes: [ 'phone_otp', 'phone', 'createdAt']
        })
        if( phoneOtpData.length == 0) throw new Error
            ("Invalid Otp")
        console.log("otpData",  phoneOtpData[0])

        // const timeOtpWasSent = Date.now() - new Date(PhoneOtpData[0].dataValues.createdAt)
        
        //     const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

        //     if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')
        await customer.update({is_phone_number_verified: true},{
            where: {
                phone: phone
            }
        })
        await otp.destroy({
            where: {
                phone:phone,
                phone_otp:phone_otp,
            },

        })
       
        sendEmail(email,'Phone OTP Verification', 'Phone verification successful')

        res.status(200).send({
            status:true,
            message:`Phone verification successful`
        })
    }catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred while verifying OTP."
        })
    }


}


module.exports = { register, verifyEmailOtp, verifyPhoneOtp }