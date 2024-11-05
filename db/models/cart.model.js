import mongoose, { model, Schema, Types } from "mongoose";

const cartS = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        unique:true,
        required:true

    }
    ,
    products:[{
        _id:false,
        productId:{type:Types.ObjectId,required:true,ref:"product"}
        ,quantity:{type:Number,default:1},
    name:String}]
},{timestamps:true})

export const cartM = model("cart",cartS)  || mongoose.models.cart