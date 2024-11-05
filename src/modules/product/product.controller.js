import { nanoid } from "nanoid"
import {catchError} from "./../../utils/catcherror.js"
import cloudnairy from "./../../utils/cloudnairy.js"
import {pM} from "./../../../db/models/product.model.js"
import {cM} from "./../../../db/models/category.model.js"
import {scM} from "./../../../db/models/subcategory.js"
import {bM} from "./../../../db/models/brand.model.js"

export const createProduct = catchError(async(req,res,next)=>{
//data

const category = await cM.findById(req.body.category)
if(!category){return next(new Error("Category is not found"))
}
const subCategory = await scM.findById(req.body.subcategory)
if(!subCategory){return next(new Error("Subcategory is not found"))
}
const brand = await bM.findById(req.body.brand)
if(!brand){return next(new Error("brand is not found"))
}
if(!req.files){
return next(new Error("Product image is required"))
}

let images = []
const cloudFolder = nanoid()
const {public_id,secure_url} = await cloudnairy.uploader.upload(req.files.defaultImage[0].path,{folder:`${process.env.CLOUD_FOLDER_NAME}/products/defaultImage/${cloudFolder}`})
for(const file of req.files.subImages){
    const {public_id,secure_url} = await cloudnairy.uploader.upload(file.path,
     {   folder:`${process.env.CLOUD_FOLDER_NAME}/product/subImages/${cloudFolder}`}
    )
images.push({id:public_id,url:secure_url})

}

const product = await pM.create({
    ...req.body,
    createdBy:req.user._id,
    images,
    defaultImage:{ url:secure_url,id:public_id},
  
    cloudFolder
})
//console.log("Product discount" , product.finalPrice)
return res.json({success:true,product})
})

export const deleteProduct =catchError(async(req,res,next)=>{
    const findProduct = await pM.findById(req.params.productId)
    if(!findProduct)
    {return next(new Error("Product is not found"))
    }
    if(findProduct.createdBy.toString()!==req.user._id.toString())
        {return next(new Error("You are not authorized"))

    }
const ids=[]
findProduct.images.map((image)=>{
ids.push(image.id)
})
await cloudnairy.api.delete_resources(ids)
await cloudnairy.api.delete_folder(`${process.env.CLOUD_FOLDER_NAME}/product/defaultImage/${findProduct.cloudFolder}`)
await cloudnairy.api.delete_folder(`${process.env.CLOUD_FOLDER_NAME}/product/subImages/${findProduct.cloudFolder}`)


ids.push(findProduct.defaultImage.id)
const findProductDel = await pM.findByIdAndDelete(req.params.productId)
return res.json({success:true,message:"Product deleted"})

})
export const getAll= catchError(async(req,res,next)=>{

if(req.params.categoryId)
{const category = await cM.findById(req.params.categoryId)
    if(!category){
        return next (new Error("Category not found"))
    }
    const product = await pM.find({category:req.params.categoryId})
    return res.json({seccess:true,product})}

    const data = {...req.query}
const page = req.query.page
    const product = await pM.find().paginate(page).selection(req.query.fields).sort(req.query.sort)
    // {$or:[{name:{$regex:data.name,$options:'i'}},{description:{$regex:data.name,$options:'i'}},{price:data.price}]}
return res.json({page,seccess:true,product})
})

export const singlePro = catchError(async(req,res,next)=>{
    const product = await pM.findById(req.params.productId)

    if(!product){
        return next (new Error("Product not found"))
    }
    return res.json({seccess:true,product})

})

export const productFromCategory = catchError(async(req,res,next)=>{
const {categoryId} = req.params
const category = await cM.findById(categoryId)
if(!category){
    return next (new Error("Category not found"))
}
const product = await pM.find({category:categoryId})
return res.json({seccess:true,product})

})