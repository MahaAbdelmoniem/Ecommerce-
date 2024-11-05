import joi from "joi";
import { idOb } from "../../middleware/validation.middleware.js";

export const placeOrderS = joi.object({
copoun:joi.string().length(5),
phone:joi.string().length(11).required(),
address:joi.string().min(10).required(),
payment:joi.string().valid("visa","cash").required()
}).required()


export const cancelOrderS = joi.object({

    orderId:joi.string().custom(idOb).required()
}
 
).required()