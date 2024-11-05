
import mongoose, { model, Schema } from "mongoose";
const uS = new Schema({
userName:{
    type:String,
    required:true,
    min:3,
    max:20
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true
},
gender:{
    type:String,
    enum:['male','female']
},
phone:String,
status:{
    type:String,
    enum:['online','offline'],
    default:"offline"
},
role:{
     type:String,
     enum:['user','admin'],
     default:"user"
},
isConfirmed:{
    type:Boolean,
    default:false
},
forgetCode:String
,activationCode:String,
pp:{
    url:{
        type:String,
        default:"https://res.cloudinary.com/dg7p8xq5q/image/upload/v1728220405/blank-profile-picture-973460_960_720_ehmkxe.webp"
    },
    id:{
type:String,
        default:"blank-profile-picture-973460_960_720_ehmkxe"
    }
},
cp:{
    url:{type:String
     
    },
    id:{type:String}
}




},{timestamps:true})


export const uM = model("user",uS) || mongoose.models.user