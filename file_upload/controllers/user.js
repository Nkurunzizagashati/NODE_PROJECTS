const loginUser = (req, res) => {
  return res.json({ msg: "User Loged in successfully!" });
};

const registerUser = (req, res) => {
  return res.json({ msg: "User registered successfully!" });
};

export { loginUser, registerUser };
