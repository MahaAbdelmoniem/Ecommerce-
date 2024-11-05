import { cartM } from "../../../db/models/cart.model.js";
 import { copounM } from "../../../db/models/copoun.model.js";
import { pM } from "../../../db/models/product.model.js";
import { catchError } from "../../utils/catcherror.js";
 import { oM } from "../../../db/models/order.model.js";
 import { createInvoice } from "../../../data.js";
 import path from "path";
 import {sendMail} from "./../../utils/sendmail.js"
import cloudnairy from "./../../utils/cloudnairy.js"
 import { claerCart,updateStock } from "./order.services.js";
 import { fileURLToPath } from "url";
 import fs from 'fs';
import Stripe from "stripe";


export const placeOrder = catchError(async(req,res,next)=>{
let orderProducts=[]
let orderPrice = 0
    const {copoun,phone,address,payment} = req.body
    let checkingCopoun 
    if(copoun){
        checkingCopoun= await copounM.findOne({name:copoun,expireAt:{$gt:Date.now()}})
    }
    if(!checkingCopoun)
{
    return next(new Error("Copoun is not avaliable"))
}

const cart = await cartM.findOne({user:req.user._id})

if(cart.products.length<1){
    return next(new Error("Empty cart"))
}
const products = cart.products
for (let i = 0; i < products.length; i++) {
    const findProduct = await pM.findById(products[i].productId)

    if(!findProduct)
    
        {  return next(new Error(`Product is not found`))}
        if(findProduct.stock<products[i].quantity)
            {
        return next(new Error(`Sorry we only have ${findProduct.stock} avalibale of the product`))
            }
            orderProducts.push({
       
                productId:products[i].productId,
                quantity:products[i].quantity,
                name:findProduct.name,
                itemPrice:findProduct.finalPrice,
                totalPrice:findProduct.finalPrice* products[i].quantity
        
            })
             orderPrice+=findProduct.finalPrice* products[i].quantity
        
}

const order = await oM.create({
    user:req.user._id,
    products:orderProducts,
    copoun:{
        id:checkingCopoun._id,
        name:checkingCopoun.name,
        discount:checkingCopoun.discount
    },
    phone,
    payment,
    address,
    price:orderPrice
})
const invoice = {
    shipping:{  name:req.user.name,
        address,
        country: "Egypt",
        phone},
        items:orderProducts,
        subtotal:orderPrice,
    paid:order.finalPrice,
    invoice_nr:order._id
  
  }
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const invoicePath = path.join(__dirname,`./../../../invoicees/${order._id}.pdf`) 
  createInvoice(invoice,invoicePath)
const {secure_url,public_id} = await cloudnairy.uploader.upload(invoicePath,{
    folder:`${process.env.CLOUD_FOLDER_NAME}/invoice/${req.user._id}`,
    resource_type:'raw'
})
const sent = sendMail({
            to: req.user.email,
            subject: "Invoice Of Your Order",
            text: "Please find attached the invoice for your order.", 
            attachments: [ 
            {
                filename: 'invoice.pdf', 
                path: invoicePath,     
                contentType: 'application/pdf'
              }]
        })
        if(sent){
            claerCart(req.user._id),
            updateStock(orderProducts,true)
            await oM.findByIdAndUpdate((order._id),{invoice:secure_url},{new:true})
        }

        // orderProducts.push({
       
        //     productId:products[i].productId,
        //     quantity:products[i].quantity,
        //     name:findProduct.name,
        //     itemPrice:findProduct.finalPrice,
        //     totalPrice:findProduct.finalPrice* products[i].quantity
    
        // })
        const stripe = new Stripe(process.env.STRIP_KEY)

        let existCopoun
        if(order.copoun.name!=="undefined"){
existCopoun = await stripe.coupons.create({
    percent_off:order.copoun.discount,
    duration:"once"
})
        }
     
        const session = await stripe.checkout.sessions.create({

            payment_method_types:["card"],
            success_url:process.env.SUCCESS_URL,
            cancel_url:process.env.CANCEL_URL,
            mode:"payment",
            line_items:orderProducts.map((product)=>{
return{
    price_data:{
        currency:"egp",
        product_data:{name:product.name},
        unit_amount:product.itemPrice*100
    },
    quantity:product.quantity
}
            }),
            discounts:existCopoun?[{coupon:existCopoun.id}]:[]
         
})


  return res.json({success:true,results:session.url,messge:"Your order is placed..check your email"})
})

export const cancelOrder = catchError(async(req,res,next)=>{
const order = await oM.findById(req.params.orderId)
if(!order ||order.status === 'canceled'
){
    return next(new Error("Order is not found"))
}
if(order.status==='deliverd'||order.status==='shipped')
{
    return next(new Error("Order can't be canceled"))
}
order.status = 'canceled'
await order.save()
updateStock(order.products,false)
return res.json('Your orderd in canceled')

})
