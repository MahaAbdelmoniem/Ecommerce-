import slugify from "slugify"
import { bM } from "../../../db/models/brand.model.js"
import { catchError } from "../../utils/catcherror.js"
import cloudinary from "../../utils/cloudnairy.js"

export const createBrand = catchError(async(req,res,next)=>{
if(!req.file){
    return next(new Error("Image is required"))
}
const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.CLOUD_FOLDER_NAME}/brand`})

const brand = await bM.create({
    name:req.body.name,
    createdBy:req.user._id,
    image:{
        url:secure_url,
        id:public_id
    },
    slug:slugify(req.body.name)
})
return res.json({sucess:true,message:"Brand is created"})

})
export const updateBrand = catchError(async(req,res,next)=>{
    
  
  let brand = await bM.findById(req.params.brandId)
if(!brand)
  {    return next(new Error("Brand not found"))
  } 
  if (req.user._id.toString()!==brand.createdBy.toString())
    {
     return next(new Error("You are not authorized"))
    } 
if(req.body.name){
brand.name=req.body.name
brand.slug=slugify(req.body.name)

}
if(req.body.file){
  const {public_id} = await cloudinary.uploader.upload(req.file.path,{
    public_id:brand.image.id
  })
 

}
 await brand.save()
 return res.json({success:true,message:"Brand updated"})


})
export const deleteBrand = catchError(async(req,res,next)=>{
const brand = await bM.findById(req.params.brandId)
if(!brand){
    return next(new Error("Brand not found"))
}
if(req.user._id.toString()!==brand.createdBy.toString()){
     return next(new Error("You are not authorized"))

}
const {public_id}= await cloudinary.uploader.destroy({public_id:brand.image.id})
const barnd = await bM.findByIdAndDelete(req.params.brandId)
return res.json({success:true,message:"Brand is deleted"})

})
export const allBrand = catchError(async(req,res,next)=>{
    const brand = await bM.find()
    return res.json({sucess:true,brand})

})

