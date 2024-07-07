import { matchedData, validationResult } from "express-validator";
import { hashPass } from "../utils/helpers.js";
import User from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";

const loginUser = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.errors[0].msg });
  }

  const data = matchedData(req);
  res.json({ msg: "User Loged in successfully!" });
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

export { loginUser, registerUser };
