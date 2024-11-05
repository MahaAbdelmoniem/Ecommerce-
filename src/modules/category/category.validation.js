import joi from "joi"

import { idOb } from "../../middleware/validation.middleware.js"



  
export const categoryS = joi.object({
    name:joi.string().min(3).max(20).required(),
    createdBy:joi.string().custom(idOb)}).required()

export const categoryUpS = joi.object({
    name:joi.string().min(3).max(10).required(),
    categoryId:joi.string().custom(idOb).required()
}).required()
export const categoryDelS = joi.object({
categoryId : joi.string().custom(idOb).required()

}).required()

