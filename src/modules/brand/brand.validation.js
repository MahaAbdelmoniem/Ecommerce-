import joi from "joi"

import { idOb } from "../../middleware/validation.middleware.js"



  
export const barnd = joi.object({
    name:joi.string().min(3).max(10).required(),
    createdBy:joi.string().custom(idOb)}).required()

export const brandUp = joi.object({
    name:joi.string().min(3).max(10).required(),
    brandId:joi.string().custom(idOb).required()
}).required()
export const brandDel = joi.object({
    brandId : joi.string().custom(idOb).required()

}).required()

