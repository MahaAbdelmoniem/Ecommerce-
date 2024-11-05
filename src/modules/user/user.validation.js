import joi from "joi"
export const regS = joi.object({
userName:joi.string().min(3).max(20).required(),
email:joi.string().email().required(),
password:joi.string().required(),
confirmPass:joi.string().valid(joi.ref("password")).required()

}).required()
export const activationS = joi.object(
    {
        activationCode:joi.string().required()
    }
).required()


export const logS = joi.object({
    email:joi.string().email().required(),
password:joi.string().required()
}).required()

export const forgetS = joi.object({
email :joi.string().email().required()
}).required()
export const passS = joi.object(
    {
        email:joi.string().email(),
        password:joi.string().required(),
        confirmPass:joi.string().valid(joi.ref("password")),
        forgetCode:joi.string().required()
    }
).required()