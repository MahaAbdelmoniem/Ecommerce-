import joi from "joi";
import { idOb } from "../../middleware/validation.middleware.js";

export const productCreateS = joi.object({
name:joi.string().min(5).max(20).required(),
description:joi.string().required(),
price:joi.number().min(1).required(),
stock:joi.number().min(1).required(),
discount:joi.number().min(1).max(100),
category:joi.string().custom(idOb).required(),
subcategory:joi.string().custom(idOb).required(),
brand:joi.string().custom(idOb).required()
}).required()
export const productID = joi.object({
  productId: joi.string().custom(idOb).required()
    }).required()

    export const productCategoryID = joi.object({
        categoryId: joi.string().custom(idOb).required()
          }).required()