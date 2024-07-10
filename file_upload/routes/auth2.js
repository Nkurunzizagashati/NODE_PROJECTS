import express from "express";
import passport from "passport";
import "../utils/google_auth.js";
import User from "../models/user.js";

const router = express.Router();

/**
 * @route GET /auth/google-login
 * @description Renders the Google login page
 * @access Public
 */
router.get("/google-login", (req, res) => {
  res.render("googleLogin", { user: req.user });
});

/**
 * @route GET /auth/google
 * @description Initiates Google OAuth authentication
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route GET /auth/google/callback
 * @description Handles the callback after Google OAuth authentication
 * @access Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Save the authenticated user to the session
    req.session.user = req.user; // Save the user object in session
    res.redirect("/auth/profile");
  }
);

/**
 * @route GET /auth/profile
 * @description Displays the profile of the logged-in user
 * @access Public
 */
router.get("/profile", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    res.send(
      `Hello, ${req.session.user.firstname} ${req.session.user.lastname}!`
    );
  } else {
    res.send("Not logged in.");
  }
});

/**
 * @route GET /auth/logout
 * @description Logs out the user and destroys the session
 * @access Public
 */
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.log("Failed to destroy session:", err);
      }
      res.redirect("/");
    });
  });
});

export default router;
