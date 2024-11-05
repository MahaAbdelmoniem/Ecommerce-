import joi from "joi";
import { idOb } from "../../middleware/validation.middleware.js";

export const cartS = joi.object({

    productId:joi.string().custom(idOb).required(),
    quantity:joi.number().integer().min(1).required()
})
export const removeFromCartS = joi.object({
    productId:joi.string().custom(idOb).required(),

})
