import { catchError } from "../../utils/catcherror.js";
import cloudinary from "../../utils/cloudnairy.js";
import slugify from "slugify";
import { cM } from "../../../db/models/category.model.js";
import { scM } from "../../../db/models/subcategory.js";
export const create = catchError(async(req,res,next)=>{

if(!req.file) return next(new Error("Image is required"))

const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.CLOUD_FOLDER_NAME}/category`})


const category = await cM.create({

    name:req.body.name,
    createdBy:req.user._id,
    image:{
        url:secure_url,
        id:public_id
    },
    slug:slugify(req.body.name)
})
return res.json({sucess:true,message:"Category created"})
})

export const update = catchError(
async (req,res,next)=>{
const {categoryId} = req.params
const category = await cM.findById(categoryId)
if(!category)
{
    return next(new Error("Category not found"))
}
if(req.user._id.toString()!== category.createdBy.toString())
   { return next(new Error("You are not authorized"))}

if(req.file)
{
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{
        public_id:category.image.id
    })
}
if(req.body.name){
    category.name = req.body.name 
    category.slug = slugify(req.body.name )

}
await category.save()
return res.json({success:true,message:"Category updated"})
}

)

export const del = catchError(async(req,res,next)=>{

    const {categoryId} = req.params
const category = await cM.findById(categoryId)
//console.log(category)
if(!category){
    return next(new Error("Category not found"))
}
if(req.user._id.toString()!== category.createdBy.toString())
    { return next(new Error("You are not authorized"))}

let sub =  await cM.findById(categoryId).populate({path:'subCategory'})
//return res.json(sub.subCategory._id)
const subId = sub.subCategory[0]._id.toString()
console.log(subId)

const subCategoryFind = await scM.findById(subId)
//console.log(subCategoryFind)
//return res.json(subCategoryFind)

const deleteSub = await scM.findByIdAndDelete(subId)

 //return res.json({success:true,deleteSub})
const imagesDel=await cloudinary.uploader.destroy(subCategoryFind.image.id)
const imageDel=await cloudinary.uploader.destroy(category.image.id)
// if(imageDel.reslut=="ok" && imagesDel.result=="ok"){ }
const deleteCategory = await cM.findByIdAndDelete(categoryId)


return res.json({success:true,message:"Category deleted"})


})

export const allC = catchError(async(req,res,next)=>{
    const category = await cM.find().populate({path:'subCategory',populate:[{path:"createdBy"}]})
    console.log(category)
    return res.json({success:true,category})
})