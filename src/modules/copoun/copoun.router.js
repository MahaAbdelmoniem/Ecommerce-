import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authoraization.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { createCopounS,updateCopounS,deleteCopounS } from "./copoun.validation.js";
import { createCopoun ,updateCopoun,deleteCopoun,allCopouns} from "./copoun.controller.js";
const router = Router()


router.post("/",authenticated,authorization("admin"),isValid(createCopounS),createCopoun)
router.patch("/:code",authenticated,authorization("admin"),
isValid(updateCopounS),
updateCopoun)
router.delete("/:code",authenticated,authorization("admin"),
isValid(deleteCopounS),
deleteCopoun)
router.get('',allCopouns)
export default router