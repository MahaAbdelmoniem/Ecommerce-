import { now } from "mongoose"
import { copounM } from "../../../db/models/copoun.model.js"
import { catchError } from "../../utils/catcherror.js"
import voucher_codes from "voucher-code-generator"

export const createCopoun = catchError(async(req,res,next)=>{
  

    const name = voucher_codes.generate({
        length:5,
        charset:"alphanumeric"
    })

    const copoun = await copounM.create({
discount:req.body.discount,
createdBy:req.user._id,
name:name[0],
expireAt :new Date(req.body.expireAt).getTime()

    })

    return res.json({sucess:true,copoun})
})


export const updateCopoun = catchError(async(req,res,next)=>{

const {code} = req.params
const copoun = await copounM.findOne({name:code,expireAt :{$gt:Date.now()}})
if(!copoun){
   return next(new Error("Copoun is not valid"))
}
copoun.discount = req.body.discount ?  req.body.discount  : copoun.discount
copoun.expireAt = req.body.expireAt ?new Date(req.body.expireAt).getTime() :copoun.expireAt
await copoun.save()
return res.json({sucess:true,copoun,message:"Copoun updated"})




})

export const deleteCopoun = catchError(async(req,res,next)=>{

    const copoun = await copounM.findOne({name:req.params.code})
    
 
    if(req.user._id.toString()!==copoun.createdBy.toString())
       
        {   return next(new Error("You are not authorized"))
        }
    if(!copoun)
        {   return next(new Error("Copoun is not valid"))
    }
 await copounM.findOneAndDelete({name:req.params.code})

    return res.json({sucess:true,message:"Copoun deleted"})


})

export const allCopouns = catchError(async(req,res,next)=>{
    const copoun = await copounM.find({expireAt:{$gt:Date.now()}})
    return res.json({sucess:true,copoun})
})