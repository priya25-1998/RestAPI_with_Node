const Joi = require('joi');

const validateStudent = (req, res, next) => {

    const schema = Joi.object({
        id: Joi.string().length(4).required(),
        name: Joi.string().min(2).required(),
        department: Joi.string().min(2).required(),
        cgpa: Joi.number().min(1).max(10).required()

    }).options({ abortEarly: false });


    const status = schema.validate(req.body);
    if (status.error) {
        res.send({
            success: false,
            message: status.error
        })
        return;
    }
    else {
        next();
    }
}



const validateId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().length(4).required()
    }).options({ abortEarly: false });

    const status = schema.validate(req.body);
    if (status.error) {
        res.send({
            success: false,
            message: status.error
        })
        return;
    }
    else {
        next();
    }

}



module.exports = { validateStudent, validateId };