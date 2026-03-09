import express from "express"
import dotenv from "dotenv"
import UserRouter from "./Routers/UserRouter.js"
import connectDB from "./lib/db.js"
dotenv.config()
const app = express()
app.use(express.json())
connectDB()

app.use("/api",UserRouter)

app.listen(process.env.PORT,()=>{
    console.log("object")
})