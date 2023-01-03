require('dotenv').config()
const jwt = require('jsonwebtoken')



const authorization = async (req, res, next) => {

    const token = req.headers.authorization

    console.log("token: ", token)

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        })
    }

    try {
        const tokenSplit = token.split(' ')
        const decoded = jwt.verify(tokenSplit[1], process.env.JWT_SECRET, (err, decoded) => {
            if (err) throw new Error (err.message)

            // console.log(decoded)
            req.body.userData= decoded
            next()
        })
    } catch (e) {
        console.log('errrr:',e)
        res.status(401).json({
            status:false,
            message:`Unauthorized`
        })
    }
    
}





module.exports= {authorization}







