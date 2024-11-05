import express from "express";
import dotenv from "dotenv"
import { appRouter } from "./src/utils/app.router.js";
import { db } from "./db/connection.js";
dotenv.config()
const app = express()
db()
appRouter(app,express)
app.listen(process.env.PORT,()=>{
    console.log("App is running on port ",process.env.PORT)
})
