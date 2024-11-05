
import mongoose, { Schema, Types,model } from "mongoose";

const bS =new Schema({
    name:{
        type:String,
        min:3,
        max:10,
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
        ref:"uM",
        required:true
    }
},{
    timestamps:true
})


export const bM = model("brand",bS) || mongoose.models.brand