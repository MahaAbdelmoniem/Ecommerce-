import { tM } from "../../db/models/token.model.js";
import { uM } from "../../db/models/user.model.js";
import { catchError } from "../utils/catcherror.js";
import jwt from "jsonwebtoken"

export const authenticated =catchError(async(req,res,next)=>{
let {token} = req.headers
if(!token){
    return next (new Error("Token is required"))
}
if(!token.startsWith(process.env.BEARERKEY)){
    return next (new Error("Token is invalid"))

}
token = token.split(process.env.BEARERKEY)[1]
const checkToken = await tM.find({token,isValid:true})
if(!checkToken){
    return next (new Error("Something went wrong"))

}
const paylpad = jwt.verify(token,process.env.SECRETKEY)
if(!paylpad){
    return next (new Error("Token verification went wrong"))

}
const user = await uM.findOne({email:paylpad.email})
if(!user){
    return next (new Error("User is not found"))

}
req.user = user
return next()


})