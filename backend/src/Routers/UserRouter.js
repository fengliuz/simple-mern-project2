import express from "express";
import { GetAllUsers, LoginManual, Logout, RegisterManual } from "../Controllers/UserController.js";
const UserRouter = express.Router()
UserRouter.post("/register",RegisterManual)
UserRouter.post("/login",LoginManual)
UserRouter.post("/logout",Logout)
UserRouter.get("/users",GetAllUsers)
export default UserRouter