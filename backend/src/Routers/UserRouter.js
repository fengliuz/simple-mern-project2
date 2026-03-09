import express from "express";
import { GetAllUsers, Register } from "../Controllers/UserController.js";
const UserRouter = express.Router()
UserRouter.get("/register",Register)
UserRouter.get("/users",GetAllUsers)
export default UserRouter