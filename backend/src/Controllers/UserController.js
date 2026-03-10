import { User } from "../Models/User.js"

export const GetAllUsers = async(req,res)=>{
    try {
        res.status(200).json({message:"This is user data function"})
    } catch (error) {
        res.status(500).json({message:"ERROR SERVER"})
    }
}

export const Register = async(req,res)=>{
    try {
        const {username,password,email} = req.body
        const newUser = new User({username,password,email})
    } catch (error) {
        res.status(500).json({message:"ERROR SERVER"})
    }
}