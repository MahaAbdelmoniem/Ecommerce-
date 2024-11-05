
import mongoose, { Schema, Types,model } from "mongoose";

export const cS =new Schema({
    name:{
        type:String,
        min:3,
        max:20,
        required:true
    },
    slug:{
type:String,
required:true
    },
    image:{
        url:{
            type:String,
            required:true
        },
        id:{
            type:String,
            required:true
        }
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    }
},{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
})
cS.virtual('subCategory',{
    ref:'subcategory',
    localField:'_id',
    foreignField:'categoryId'
})

export const cM = model("category",cS) || mongoose.models.category