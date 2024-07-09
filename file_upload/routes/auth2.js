import express from "express";
import passport from "passport";
import "../utils/google_auth.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/google-login", (req, res) => {
  //   return res.send("hello");
  res.render("googleLogin", { user: req.user });
});

// Login route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Save the authenticated user to the session
    req.session.user = req.user; // Save the user object in session
    res.redirect("/auth/profile");
  }
);

// Define a route to display session information for testing
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
