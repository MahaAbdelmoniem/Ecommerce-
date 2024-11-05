

import mongoose, { model, Schema, Types } from "mongoose";

export const scS = new Schema({
    name:{
        type:String,required:true,min:5,max:20

    },
    slug:{
        type:String,required:true
    },
    image:{
       
        url:{
            type:String,
            required:true
        },
            id:{
                type:String,
                required:true
            }        },
            categoryId:{
                type:Types.ObjectId,
                ref:"category",
                required:true
            },
            createdBy:{
                type:String,
                ref:"user",
                required:true
            }


    }


,
{timestamps:true})
export const scM = model("subcategory",scS) || mongoose.models.subcategory