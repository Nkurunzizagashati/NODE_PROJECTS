import express from "express";
import session from "express-session";
import passport from "passport";
import supertest from "supertest";
import authRoutes from "../routes/auth2.js"; // Adjust the path according to your project structure

jest.mock("passport", () => {
  return {
    authenticate: jest.fn((strategy, options) => (req, res, next) => {
      req.user = { firstname: "John", lastname: "Doe" }; // Mock user
      next();
    }),
    initialize: jest.fn(() => (req, res, next) => next()),
    session: jest.fn(() => (req, res, next) => next()),
    use: jest.fn(), // Mock passport.use
    serializeUser: jest.fn(), // Mock serializeUser
    deserializeUser: jest.fn(), // Mock deserializeUser
  };
});

jest.mock("../models/user.js"); // Mock your User model

const app = express();
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

describe("Auth Routes", () => {
  test("GET /auth/google-login should render googleLogin page", async () => {
    const response = await supertest(app).get("/auth/google-login");
    expect(response.status).toBe(200);
  });

  // Add more tests for other routes as needed
});
