import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authoraization.js";
import { fileArrayType, uploadFile } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { productCreateS,productID ,productCategoryID} from "./product.validation..js";
import { createProduct ,deleteProduct,getAll,singlePro,productFromCategory} from "./product.controller.js";



const router = Router({mergeParams:true})

router.post("",authenticated,authorization("admin"),uploadFile(fileArrayType.image).fields([{name:"defaultImage",maxCount:1},{name:"subImages",maxCount:3}]),
isValid(productCreateS),createProduct)

router.delete("/:productId",authenticated,authorization("admin"),isValid(productID),deleteProduct)
router.get("/",getAll)
router.get("/single/:productId",isValid(productID),singlePro)
router.get("",isValid(productCategoryID),productFromCategory)

export default router

