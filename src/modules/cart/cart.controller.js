import { cartM } from "../../../db/models/cart.model.js";
import { catchError } from "../../utils/catcherror.js";
import {pM} from "./../../../db/models/product.model.js"
export const addToCart = catchError(async(req,res,next)=>{

    const{productId,quantity} = req.body
    const product = await pM.findById(productId)
 
   if (!product){
    return next(new Error("Product not found"))
    }
 
    if(product.stock<quantity)
        {
            return next(new Error(`Sorry! Only ${product.stock} items are avaliable`))
        }
      
        const proInCart = await cartM.findOne({ user: req.user._id, "products.productId": productId });
if(!proInCart){ 
   let  cart = await cartM.findOneAndUpdate({user:req.user._id},{$push:{products:{productId,quantity,name:product.name}}},{new:true})
}
        if (proInCart) {
          // Find the specific product in the cart
          const wantedPro = proInCart.products.find(x => x.productId.toString() === productId.toString());
        
          if (wantedPro) {
            // Check if adding the desired quantity exceeds stock
            if (wantedPro.quantity + quantity > product.stock) {
              return next(new Error(`Sorry! Only ${product.stock} items are available`));
            }
        
            // Update quantity directly
            wantedPro.quantity += quantity;
        
            // Save the changes back to the database
            await proInCart.save();
          }
        }
        const cart = await cartM.findOne({user:req.user._id})
return res.json({sucess:true,cart})
})

export const userCart = catchError(async(req,res,next)=>{
    // const cart = await cartM.findOne({user:req.user._id}).populate(

    const cart = await cartM.findOne({user:req.user._id}).populate("products.productId","name quantity dafultImage.url price discount finalPrice")
    return res.json({sucess:true,cart})
})

/**
{path:"products.productId",select:"name dafultImage.url"}
 */


export const updateCart = catchError(async(req,res,next)=>{
    const{productId,quantity} = req.body
    const product = await pM.findById(productId)
   if (!product){
    return next(new Error("Product not found"))
    }
if(quantity>product.stock)
{
    return next(new Error(`Sorry! Only ${product.stock} items are avaliable`))

}
//const cart = await cartM.findOneAndUpdate({user:req.user._id,"products.productId":productId},{$set:{"products.$.quantity":quantity}},{new:true})
const cart = await cartM.findOneAndUpdate({user:req.user._id,"products.productId":productId},{$set:{"products.$.quantity":quantity}},{new:true})
return res.json({sucess:true,cart})


})

export const removeFromCart = catchError(async(req,res,next)=>{

const cart = await cartM.findOneAndUpdate({user:req.user._id},{$pull:{products:{productId:req.params.productId}}},{new:true})

return res.json({sucess:true,cart,message:"Product removed"})

})

export const clearCart = catchError(async(req,res,next)=>{
//     let fun=(ar)=>{
// ar.map((x)=>{
//     x.remove()
// })
//     } 
    const cart = await cartM.findOneAndUpdate({user:req.user._id},{products:[]},{new:true})
    return res.json({sucess:true,cart,message:"Cart cleared"})

})