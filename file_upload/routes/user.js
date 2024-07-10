import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user.js";
import { checkSchema } from "express-validator";
import {
  loginUserValidator,
  createUserValidator,
} from "../middlewares/userValidator.js";

const router = express.Router();

/**
 * Loging in user route
 * @route POST /api/users/login
 * @description Handles user login
 * @group Users
 * @param {object} req.body - The request body containing user credentials
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user's password
 * @middleware {checkSchema(loginUserValidator)} - Validates the login request body
 * @returns {object} 200 - The authenticated user object
 * @returns {Error}  400 - Validation error
 * @returns {Error}  401 - Unauthorized
 */
router.post("/login", checkSchema(loginUserValidator), loginUser);

/**
 * @route POST /api/users/register
 * @description Handles user registration
 * @group Users
 * @param {object} req.body - The request body containing user details
 * @param {string} req.body.name - The user's name
 * @param {string} req.body.email - The user's email
 * @param {string} req.body.password - The user's password
 * @middleware {checkSchema(createUserValidator)} - Validates the registration request body
 * @returns {object} 201 - The registered user object
 * @returns {Error}  400 - Validation error
 */
router.post("/register", checkSchema(createUserValidator), registerUser);

/**
 * @route GET /api/users
 * @description Retrieves all registered users
 * @group Users
 * @returns {Array.<object>} 200 - An array of all registered users
 * @returns {Error}  500 - Server error
 */
router.get("/", getAllUsers);

export default router;
