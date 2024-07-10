import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

/**
 * Passport middleware configuration for Google OAuth 2.0 authentication.
 * Uses Google OAuth 2.0 strategy to authenticate users.
 * @param {string} accessToken - Access token provided by Google OAuth.
 * @param {string} refreshToken - Refresh token provided by Google OAuth.
 * @param {Object} profile - User profile object returned by Google OAuth.
 * @param {Function} done - Callback function to be called after authentication process.
 * @returns {Function} Callback function 'done' with either an error or authenticated user.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = new User({
              firstname: profile.name.givenName,
              lastname: profile.name.familyName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
            await user.save();
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/**
 * Serializes user object into session.
 * @param {Object} user - User object to be serialized.
 * @param {Function} done - Callback function to indicate serialization completion.
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
 * Deserializes user object from session.
 * @param {string} id - User ID stored in session.
 * @param {Function} done - Callback function to return deserialized user object.
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
