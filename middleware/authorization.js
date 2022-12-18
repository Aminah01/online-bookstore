require('dotenv').config()
const jwt = require('jsonwebtoken')



function authorization(req,res,next) {

    const Token = req.header.authorization

    if (!Token) {
        res.status(400).json({
            Status:false,
            Message:`Unauthorized`
        })
    }

    try {
        const tokenSplit = token.split(' ')
        const decoded = jwt.verify(tokenSplit[1], process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                throw new Error (err.message)
            }
            console.log(decoded)
            req.body.userData= decoded
            next()
        })
    } catch (e) {
        console.log('errorForTryCatch:',e)
        res.status(400).json({
            status:false,
            message:`Unauthorized`
        })
    }
    
}





module.exports= {authorization}







