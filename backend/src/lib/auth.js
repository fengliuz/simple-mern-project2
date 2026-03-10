import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
import { User } from "../Models/User.js";
dotenv.config();
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/google/callback",
  }),
  async function (accessToken, refreshToken,profile,cb) {
    try {
        let user = await User.findOne({googleId:profile.id})
        if(!user){
            user = await User.create({
                username:profile.given_name || profile.displayName,
                googleId:profile.id,
                email:profile.emails[0].value,
                avatar:profile.photos[0].value,
            })
            return cb
        }
    } catch (error) {
        
    }
  },
);
