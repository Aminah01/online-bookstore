const express = require('express')
const router = express.Router()
const { register,verifyEmailOtp, verifyPhoneOtp } = require ('../controllers/customer.controllers')


router.post('/register', register)
router.get('/verify-email-otp/:email/:email_otp', verifyEmailOtp)
router.get('/verify-phone-otp/:phone/:phone_otp/:email', verifyPhoneOtp)




module.exports = router