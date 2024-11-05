import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { placeOrderS,cancelOrderS } from "./order.validation.js";
import { placeOrder ,cancelOrder} from "./order.controller.js";

const router = Router()

router.post("/placeOrder",authenticated,isValid(placeOrderS),placeOrder)
router.patch("/:orderId",authenticated,isValid(cancelOrderS),cancelOrder)




export default router