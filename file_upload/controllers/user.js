import { matchedData, validationResult } from "express-validator";
import { comparePassword, hashPass } from "../utils/helpers.js";
import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";

const loginUser = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.errors[0].msg });
    }

    const data = matchedData(req);

    const user = await User.findOne({ email: data.email });
    if (!user)
      return res.status(401).json({ error: "Incorect email or password" });
    const passwordMatches = await comparePassword(data.password, user.password);

    if (!passwordMatches)
      return res.status(401).json({ error: "Incorrect email or password" });
    res.json({ msg: "User Loged in successfully!" });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

const registerUser = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.errors[0].msg });
    }

    const data = matchedData(req);
    const password = data.password;

    const hashedPassword = await hashPass(password);

    if (!hashedPassword)
      return res.status(500).json({ err: "Something went wrong" });

    data.password = hashedPassword;
    const newUser = await User.create(data);
    return res.status(201).json({
      msg: "User registered successfully!",
      newUser: {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "firstname lastname email");
    if (users) res.json({ users });
  } catch (error) {
    errorHandler(req, res, error);
  }
};

export { loginUser, registerUser, getAllUsers };
