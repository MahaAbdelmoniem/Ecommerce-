import mongoose, { model, Schema, Types } from "mongoose";

const copounS = new Schema({
    name:{
        type:String,required:true
    },
    expireAt:{
        type:Date,required:true
    },
    createdBy:{
type:Types.ObjectId,
ref:"user",required:true
    },
    discount:{
        type:Number,min:1,max:100,required:true
    }
},{timestamps:true})
export const copounM = mongoose.models.copoun || model("copoun",copounS)