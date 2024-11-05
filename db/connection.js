import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const db = async()=>{
return await mongoose.connect(process.env.CONNECTION).then(()=>{
    console.log("Data Base is connected")
}).catch((error)=>{
    console.log("Data Base is not connected",error.message)

})
}