import express from "express";
import { GetAllUsers, LoginManual, RegisterManual } from "../Controllers/UserController.js";
const UserRouter = express.Router()
UserRouter.post("/register",RegisterManual)
UserRouter.post("/login",LoginManual)
UserRouter.get("/users",GetAllUsers)
export default UserRouter