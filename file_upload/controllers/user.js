import { matchedData, validationResult } from "express-validator";

const loginUser = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.errors[0].msg });
  }

  const data = matchedData(req);
  res.json({ msg: "User Loged in successfully!" });
};

const registerUser = (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.errors[0].msg });
  }

  const data = matchedData(req);
  return res.json({ msg: "User registered successfully!" });
};

export { loginUser, registerUser };
