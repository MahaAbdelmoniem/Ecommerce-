import { cartM } from "../../../db/models/cart.model.js";
import { pM } from "../../../db/models/product.model.js";

//Clear cart
export const claerCart = async (userId)=>{
await cartM.findOneAndUpdate({user:userId},{products:[]},{new:true})
}



export const updateStock = async(products,place)=>{
    if(place){
        for(const x of products) {
        await pM.findByIdAndUpdate(x.productId,{
            $inc:{soldItems:x.quantity,stock:-x.quantity}
        },{new:true})
      
    }}
    else{
        for(const x of products) {
            await pM.findByIdAndUpdate(x.productId,{
                $inc:{soldItems:-x.quantity,stock:x.quantity}
            },{new:true})
    }


}}