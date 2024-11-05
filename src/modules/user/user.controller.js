
import { uM } from "../../../db/models/user.model.js"
import { catchError } from "../../utils/catcherror.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { sendMail } from "../../utils/sendmail.js"
import jwt from "jsonwebtoken"
import { tM } from "../../../db/models/token.model.js"
import randomstring from "randomstring"
import { cartM } from "../../../db/models/cart.model.js"
export const register = catchError(
async(req,res,next)=>{
const {userName,password,email} = req.body
const isUser = await uM.findOne({email})
if(isUser){
    return next(new Error("Email is already regestired"),{cause:409})
}
const hashPass = bcryptjs.hashSync(password,Number(process.env.SALTROUNDS))
 
//Activation code
//*const //activationCode = crypto.randomBytes(64).toString("hex")*/
const token = jwt.sign({email},process.env.SECRETKEY)
const user = await uM.create({userName,password:hashPass,email})
const isSent=await sendMail({to:email,subject:"Account Activation",html:`<a href=http://localhost:3000/user/confirmEmail/${token}>Please click here to confirm your email</a>`})
if(isSent){return res.json ({success:true,message:"Check your email to activate it"})}

return next (new Error("Something went wrong!!"))
})
export const confirmEmail = catchError(async(req,res,next)=>{
    const {token} = req.params
    const {email} =  jwt.verify(token,process.env.SECRETKEY)
const user = await uM.findOneAndUpdate({email},{isConfirmed:true},{new:true})

if(!user){
    return next (new Error("Something went wrong!"))
}
 await cartM.create({user:user._id})
 
return res.json({success:true,messgae:"Your email is activated. Try to login"})
})
export const login = catchError(async(req,res,next)=>{
    const {email,password} = req.body
    const isUser = await uM.findOne({email})
    if(!isUser ){
        return next(new Error("Invalid Email"))
    }
    if(!isUser.isConfirmed){
        
        return next(new Error("This email is not activated"),{cause:400})
    }
 const hashedPass = bcryptjs.compareSync(password,isUser.password)
if(!hashedPass){
    return next(new Error("Password is wrong"),{cause:400})

}
const token = jwt.sign({email,id:isUser._id},process.env.SECRETKEY)

const saveToken = await tM.create({token,user:isUser._id,agent:req.headers["user-agent"]})
isUser.status = "online"
await  isUser.save()

return res.json({success:true,token})


})

export const sendCode =catchError(async(req,res,next)=>{

const {email} = req.body
const user = await uM.findOne({email})
if(!user){
    return next(new Error("Invalid email"))

}
const code = randomstring.generate({
    length:5,
    charset:"alphanumeric"
})
const mail = await sendMail({to:email,subject:"Reset password code",text:code})
 user.forgetCode = code
 await user.save()
 return res.json({success:true,message:"Check your email"})


})
export const resetPass = catchError(async(req,res,next)=>{
const {email,password,confirmPass,forgetCode} = req.body
let user = await uM.findOne({email})
if(!user) {
    return next(new Error("Invalid email"))

}
if(user.forgetCode!==forgetCode)
{
    return next(new Error("Invalid code"))

}
const hashPass = bcryptjs.hashSync(password,(Number(process.env.SALTROUNDS)))
await uM.findOneAndUpdate({email,forgetCode},{password:hashPass,$unset:{forgetCode:1}},{new:true})
const tokens = await tM.find({user:user._id})

tokens.forEach(async(token) => {
    token.isValid = "false"
    await token.save()
 
});
return res.json({success:true,message:"Password is updated"})

})

