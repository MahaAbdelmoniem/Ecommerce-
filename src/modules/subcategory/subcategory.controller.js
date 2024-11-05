import mongoose from "mongoose";
import { catchError } from "../../utils/catcherror.js";
import cloudinary from "../../utils/cloudnairy.js";
import { cM } from "../../../db/models/category.model.js";
import { scM } from "../../../db/models/subcategory.js";
import slugify from "slugify";

export const subCategoryCreate = catchError(
    async(req,res,next)=>{
const {categoryId} = req.params
const category = await cM.findById(categoryId)
if(!category){return next(new Error("Category not found"))}
   if (!req.file){
        return next(new Error("Image is required"))
    }
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.CLOUD_FOLDER_NAME}/subcategory`})
    const subcategory = await scM.create({
        name:req.body.name,
        slug:slugify(req.body.name),
        image:{
            url:secure_url,
            id:public_id

        },
        createdBy:req.user._id,
        categoryId
        
        })




return res.json({success:true,subcategory})

})
   

export const subCategoryUpdate = catchError(async(req,res,next)=>{

    const category = await cM.findById(req.params.categoryId)
if(!category){return next(new Error("Category not found"))}

const subcategory = await scM.findOne({_id:req.params.subCategoryId,categoryId:req.params.categoryId})

if(!subcategory){
    return next(new Error("Subcategory not found"))
}

if(req.body._id.toString()!== subcategory.createdBy.toString())
    {return next(new Error("You are not authorized"))}

    if(req.body.name){
    subcategory.name = req.body.name,
    subcategory.slug = slugify(req.body.name)
}
if(req.file){
    const{public_id,secure_url} = await  cloudinary.uploader.upload(req.file.path,{
        public_id:subcategory.image.id
    })
}
await subcategory.save()
return res.json({success:true,message:"Subcategoy updated"})

}
)

export const subCategoryDelete = catchError(async (req,res,next)=>{
    const category = await cM.findById(req.params.categoryId)
    // if(!category){
    //     return next(new Error("Category not found"))
    // }

    let subcategory = await scM.findOne({_id:req.params.subCategoryId,categoryId:req.params.categoryId})

if(!subcategory){
    return next(new Error("Subcategory not found"))
}
if(req.user._id.toString()!== subcategory.createdBy.toString())
   {return next(new Error("You are not authorized"))}

await cloudinary.uploader.destroy({public_id:subcategory.image.id})
subcategory = await scM.findOneAndDelete({_id:req.params.subCategoryId,categoryId:req.params.categoryId})
return res.json({success:true,message:"Subcategoy deleted"})
})
export const getAll = catchError(async(req,res,next)=>{

const subcategory  =await scM.find().populate([{path:"createdBy"},{path:"categoryId"}])

return res.json({success:true,subcategory})

})