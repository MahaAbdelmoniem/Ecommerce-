import mongoose, { model, Schema, Types } from "mongoose";

const oS = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    },
    products:[{
        _id:false,
        productId:{type:Types.ObjectId,ref:"product"},
        quantity:{type:Number,min:1},
        name:String,
        itemPrice:Number,
        totalPrice:Number 

    }],
    invoice:String,
    address:{
        type:String,
        required:true

    },
    phone:{
        type:String,
        required:true

    },
    price:{
        type:String,
        required:true

    },
    copoun:{
        id:{type:Types.ObjectId,
        ref:"copoun"},
        name:String,
        discount:{type:Number,min:1,max:100}
    },
    status:{
        type:String,
        enum:["placed","shipped","canceled","refunded","deliverd"],
        default:"placed"
    },
    payment:{
        type:String,
        enum:["visa","cash"]
    }
},{timestamps:true})
oS.virtual("finalPrice").get(function(){

    return this.copoun?Number(parseFloat(this.price-(this.price*this.copoun.discount||0)/100)).toFixed(2):this.price
})


export const oM = model("order",oS) || mongoose.models.order