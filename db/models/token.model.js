
import mongoose, { model, Schema, Types } from "mongoose";

const tS = new Schema({

token :{
    type:String,
    required:true
},
user:{
    type:Types.ObjectId,
    ref:"user"
},
 isValid:{
    type:Boolean,
    default:true
 },
 agent:String,
 expiredAt:String
 

},{timestamps:true})
export const tM = model ("token",tS) || mongoose.models.token