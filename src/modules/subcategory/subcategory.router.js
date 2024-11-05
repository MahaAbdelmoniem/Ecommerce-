import { Router } from "express";
import { authenticated } from "../../middleware/authentication.js";
import { authorization } from "../../middleware/authoraization.js";
import { fileArrayType, uploadFile } from "../../utils/multer.js";
import { isValid } from "../../middleware/validation.middleware.js";
import { subCategoryCreate,subCategoryUpdate,subCategoryDelete ,getAll} from "./subcategory.controller.js";
import {subCategorySchema,subCategorySchemaUp,subCategorySchemaDel} from "./../subcategory/subcategory.validation.js"
const router = Router({mergeParams:true})
//create

router.post("/",authenticated,authorization("admin"),uploadFile(fileArrayType.image).single("subcategory"),isValid(subCategorySchema),
subCategoryCreate)
router.patch("/:subCategoryId",authenticated,authorization("admin"),uploadFile(fileArrayType.image).single("subcategory"),isValid(subCategorySchemaUp),
subCategoryUpdate)

router.delete("/:subCategoryId",authenticated,authorization("admin"),uploadFile(fileArrayType.image).single("subcategory"),isValid(subCategorySchemaDel),
subCategoryDelete)
router.get("/",getAll)
export default router