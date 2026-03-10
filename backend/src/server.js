import express from "express";
import dotenv from "dotenv";
import UserRouter from "./Routers/UserRouter.js";
import connectDB from "./lib/db.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import "./lib/auth.js";
dotenv.config();
const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(
  session({
    secret: "Test1",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  }),
);
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json());
connectDB();
app.use("/api", UserRouter);
// Simple AUTHENTICATION WITH GOOGLE PROVIDER
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login?error=failed",
  }),(req,res)=>{
    res.redirect("http://localhost:5173/dashboard")
  }
);
// app.get("auth/failure", (req, res) => {
//   res.send("Something Went Wrong");
// });
//

app.listen(process.env.PORT, () => {
  console.log("object");
});
