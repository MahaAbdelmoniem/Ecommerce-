

import mongoose, { get, model, Schema ,Types} from "mongoose";


const pS = new Schema({
    name:{
        type:String,
        min:5,
        max:20,
        required:true
    },

        description:{  type:String,
      
        required:true},
    price:{ type:Number,
      
        required:true},
    images:[{
        url:{type:String,required:true},
        id:{type:String,required:true}
    }],
    defaultImage:{
        url:{type:String,required:true},
        id:{type:String,required:true}
    },
    stock:{type:Number,
      min:1,
        required:true},
        discount:{
            type:Number,
            
        min:1,
        max:100
        },
        createdBy:{
            type:Types.ObjectId,ref:"user", required:true
        },
        soldItems:{
            type:Number,default:0
        }, category:{
            type:Types.ObjectId,ref:"category",required:true
        },
        subcategory:{
            type:Types.ObjectId,ref:"subcategory",required:true        }
            , brand:{
            type:Types.ObjectId,ref:"brand",required:true
        },
        cloudFolder:{
            type:String,unique:true
        }
},
{timestamps:true,strictQuery:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

pS.virtual("finalPrice").get(function(){
    return Number(parseFloat(this.price-(this.price*this.discount ||0)/100)).toFixed(2)
})


//Quey helper

pS.query.paginate = function(page){
    

const limit = 2
const skip = limit * (page-1)
!page|| page <= 0 || isNaN(page) ? page=1 :page
return this.skip(skip).limit(limit)


}
pS.query.selection = function(fields){
    if(!fields) return this
    fields = fields.split(" ")
const keys = Object.keys(pM.schema.paths)
const mathcedKeys = fields.filter((key)=>keys.includes(key))
return this.select(mathcedKeys)
}
pS.query.search = function (data){
   return  this({name:{$regex:data.name,$options:'i'}})

}
pS.methods.inStock = function(reqQuantity){
return this.stock >= reqQuantity ? true : false
}
export const pM = model("product",pS) || mongoose.models.product 