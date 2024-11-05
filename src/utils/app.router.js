
import uR from "./../modules/user/user.router.js"
import cR from "./../modules/category/category.router.js"
import scR from "./../modules/subcategory/subcategory.router.js"
import bR from "./../modules/brand/brand.router.js"
import pR from "./../modules/product/product.router.js"
import copounR from "./../modules/copoun/copoun.router.js"
import cartR from "./../modules/cart/cart.router.js"
import orderR from "./../modules/order/order.router.js"

import morgan from "morgan"

export const appRouter = (app,express)=>{
   app.use(express.json())
//     if(process.env.NODE_ENV=="development")
// {app.use(morgan("combined"))}
// app.use((req,res,next)=>{  
// if(req.originalUrl.includes("/user/confirmEmail"))
// {
//     res.setHeader("Access-Control-Allow-Origin","*")
// res.setHeader("Access-Control-Allow-Methods","GET")
// }
//     const whiteList = ["http://localhost:3000"]
// if(!whiteList.includes(req.header("origin"))){
//     return next (new Error("Blocked by CORS"))
// }
// res.setHeader("Access-Control-Allow-Origin","*")
// res.setHeader("Access-Control-Allow-Methods","*")
// res.setHeader("Access-Control-Allow-Headers","*")
// res.setHeader("Access-Control-Allow-Private-Network",true)
// return next()

// })

  app.use("/user",uR)
   app.use("/category",cR)
   app.use("/subcategory",scR)
   app.use("/brand",bR)
   app.use("/product",pR)
   app.use("/copoun",copounR)
   app.use("/cart",cartR)
   app.use("/order",orderR)


    app.all("*",(req,res,next)=>{
        return next(new Error("Page not found",{cause:404}))
    })
app.use((error,req,res,next)=>{

    return res.status(error.cause || 500).json({success:false,messgae:error.message,stack:error.stack})
})
}