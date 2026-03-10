import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:function(){return !this.googleId;},
        minlength:[6,"password minimal characters is 3 letters"],
        trim:true
    },
    googleId:{
        type: String,
        unique:true,sparse:true
    },
    avatar:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model("User",UserSchema)