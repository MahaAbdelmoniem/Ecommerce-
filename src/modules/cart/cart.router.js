import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { addToCart, updateCart, userCart,removeFromCart ,clearCart} from "./cart.controller.js";
import { cartS,removeFromCartS } from "./cart.validation.js";
const router = Router()
router.post("",authenticated,isValid(cartS),addToCart)
router.get("",authenticated,userCart)
router.patch("",authenticated,isValid(cartS),updateCart)
router.patch("/clear",authenticated,clearCart)
router.patch("/:productId",authenticated,isValid(removeFromCartS),removeFromCart)

export default router