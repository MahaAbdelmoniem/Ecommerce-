import joi from "joi";
import { idOb } from "../../middleware/validation.middleware.js"

export const subCategorySchema = joi.object({
    name:joi.string().min(5).max(20).required(),
    categoryId :joi.string().custom(idOb).required(),
}).required()


export const subCategorySchemaUp = joi.object({
    categoryId:joi.string().custom(idOb).required(),
    subCategoryId:joi.string().custom(idOb).required(),
    name:joi.string().min(5).max(20)
})
export const subCategorySchemaDel = joi.object({
    categoryId:joi.string().custom(idOb).required(),
    subCategoryId:joi.string().custom(idOb).required(),
 
})