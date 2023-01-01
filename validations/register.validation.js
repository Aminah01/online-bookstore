const Joi = require('joi');

const validateRegistration = (data)=>{

    const schema = Joi.object({

        lastName: Joi.string().min(2).required(),
        firstName: Joi.string().min(2).required(),
        username: Joi.string().min(2).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        phone: Joi.string().min(2).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
        address: Joi.string().min(2).required()
    })

    return  schema.validate(data);  
}

module.exports = { validateRegistration }