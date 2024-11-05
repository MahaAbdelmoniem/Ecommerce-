import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authoraization.js";
import { fileArrayType, uploadFile } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { barnd,brandDel,brandUp } from "./brand.validation.js";
import{createBrand,updateBrand,deleteBrand,allBrand} from "./brand.controller.js"
const router = Router()
router.post("",authenticated,authorization("admin"),uploadFile(fileArrayType.image
).single("brand"),isValid(barnd),createBrand)
router.patch("/:brandId",authenticated,authorization("admin"),uploadFile(fileArrayType.image
).single("brand"),isValid(brandUp),updateBrand)
router.delete("/:brandId",authenticated,authorization("admin"),uploadFile(fileArrayType.image
).single("brand"),isValid(brandDel),deleteBrand)
router.get("",allBrand)
export default router