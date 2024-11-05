import joi from "joi"
export const createCopounS = joi.object({
discount:joi.number().min(1).max(100).required(),
expireAt:joi.date().greater(Date.now()).required()


}).required()


export const updateCopounS = joi.object({
    discount:joi.number().min(1).max(100),
    expireAt:joi.date().greater(Date.now()),
    code:joi.string().length(5).required()}).required()

    export const deleteCopounS =  joi.object({
        code:joi.string().length(5).required()}).required()
    