import { Router } from "express";
import {create,update,del,allC} from "./category.controller.js"
import { isValid } from "../../middleware/validation.middleware.js";
import { categoryS,categoryUpS,categoryDelS } from "./category.validation.js";
import { authenticated } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authoraization.js";
import { fileArrayType,uploadFile } from "../../utils/multer.js";
import scR from "./../subcategory/subcategory.router.js"
import pR from "./../product/product.router.js"

const router = Router()
router.use("/:categoryId/subCategory",scR)
router.use("/:categoryId/product",pR)

router.post("/",authenticated,authorization("admin"),

uploadFile(fileArrayType.image).single("category"),
isValid(categoryS),create)
router.patch("/:categoryId",authenticated,authorization("admin"),uploadFile(fileArrayType.image).single("category"),
isValid(categoryUpS),
update)
router.delete("/:categoryId",authenticated,authorization("admin"),isValid(categoryDelS),del)
router.get("/",allC)
export default router