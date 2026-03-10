import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
export const GetAllUsers = async (req, res) => {
  try {
    res.status(200).json({ message: "This is user data function" });
  } catch (error) {
    res.status(500).json({ message: "ERROR SERVER" });
  }
};

export const RegisterManual = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ message: "password minimal characters is 6 letters" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, password: hashedPw, email });
    req.login(newUser,(error)=>{
        res.status(201).json({
          message: "Registration successfull!",
        });
        
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "ERROR SERVER", error });
  }
};

export const LoginManual = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email or Password you entered is incorrect!",
      });
    }
    if(user.googleId && !user.password){
        return res.status(400).json({
          message: "Email still dont have password and you must login via Google first!",
        });

    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.login(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Login failed during session" });
        }
        return res.status(200).json({
          message: "Login successful!",
          user: { id: user._id, username: user.username }
        });
      });
    } else {
      return res.status(400).json({
        message: "Email or Password you entered is incorrect!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Logout = async(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(400).json({message:"Logout failed"})
        }
        
        req.session.destroy((err)=>{
            if(err){
                return res.status(400).json({message:"Destroy dession failed"})
            }

        res.clearCookie('connect.sid')
        res.status(200).json({message:"Logout successfull"})
        })
    })
}