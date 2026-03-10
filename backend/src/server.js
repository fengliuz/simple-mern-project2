import express from "express";
import dotenv from "dotenv";
import UserRouter from "./Routers/UserRouter.js";
import connectDB from "./lib/db.js";
import passport from "passport";
import session from "express-session";
import "./lib/auth.js";
dotenv.config();
const app = express();
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
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate With Google</a>');
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/failure",
  }),
);
app.get("auth/failure", (req, res) => {
  res.send("Something Went Wrong");
});
// Di app.js
app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Halo ${req.user.username}, data kamu sudah masuk database!`);
  } else {
    res.status(401).send("Login dulu coy");
  }
});
//

app.listen(process.env.PORT, () => {
  console.log("object");
});
