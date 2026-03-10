import express from "express";
import dotenv from "dotenv";
import UserRouter from "./Routers/UserRouter.js";
import connectDB from "./lib/db.js";
import passport from "passport";
import session  from "express-session";
import "./lib/auth.js"
dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.use(session({
    resave:false,saveUninitialized:false,secret:"amba",cookie:{secure:false}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", UserRouter);
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Authorize</a>");
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile","email"] }),
);
app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/error" }),async(req,res)=>{
    res.redirect("/dashboard")
  }
);

app.get("/auth/error",(req,res)=>{
    res.send("<p>err</p>")
})
app.get("/dashboard",(req,res)=>{
    res.send("<p>aaaaa</p>")
})

app.listen(process.env.PORT, () => {
  console.log("object");
});
