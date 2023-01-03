// require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { customer }= require('../models')





const login = async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await customer.findAll( { where: { email: email } } )

        if (user.length === 0) 
            throw new Error ("Email or password is Incorrect")
        
        const passwordHashFromDB = user[0].dataValues.password_hash
        const passwordCompare =  await bcrypt.compare(password, passwordHashFromDB)

        if (passwordCompare === false) throw new Error ("Email or password is incorrect")
          
        const token = jwt.sign({
                email: email,
                customer_id: user[0].dataValues.customer_id,
                phone: user[0].dataValues.phone,
                firstName: user[0].dataValues.firstName,
                lastName: user[0].dataValues.lastName
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' })

        res.setHeader('token', token)

        res.status(200).json({
            status: true,
            token: token,
            message: 'Successfully Login'
        })

    } catch (e) {
        res.status(400).json({
            status:false,
            message: e.message || "Sorry, something went wrong"
        })
    }       




}





module.exports = { login }