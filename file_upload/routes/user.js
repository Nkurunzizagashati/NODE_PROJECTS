import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { checkSchema } from "express-validator";
import {
  loginUserValidator,
  createUserValidator,
} from "../middlewares/userValidator.js";

const router = express.Router();

router.post("/login", checkSchema(loginUserValidator), loginUser);
router.post("/register", checkSchema(createUserValidator), registerUser);

export default router;
