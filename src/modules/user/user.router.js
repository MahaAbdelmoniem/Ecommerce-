import { Router } from "express";
import {register,confirmEmail,login,sendCode,resetPass} from "./../user/user.controller.js"
import { isValid } from "../../middleware/validation.middleware.js";
import { activationS, regS,logS ,forgetS,passS} from "./user.validation.js";

const router = Router()
router.post("/register",isValid(regS),register)
router.get("/confirmEmail/:token",confirmEmail)
router.post("/login",isValid(logS),login)
router.patch("/forgetpass",isValid(forgetS),sendCode)
router.patch("/resetpass",isValid(passS),resetPass)

export default router