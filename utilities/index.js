const bcrypt = require('bcrypt')
const saltRounds = 10


const hashMyPassword = (password) =>{

    return new Promise ((resolve, reject) => {

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    reject(err)
                }
                resolve([hash, salt])
            });
        });
    })
}


const generateOtp = () => {

    const otp = Math.floor(100000 + Math.random() * 9000)

    return otp
}


module.exports ={  hashMyPassword, generateOtp }
