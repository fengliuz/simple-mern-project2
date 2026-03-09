import mongoose from "mongoose";
import dotenv from "dotenv"
const connectDB = async()=>{
    console.log(process.env.MONGO_URI)
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully ")
        
    } catch (error) {
        console.log("error"+error)
    }
}
export default connectDB