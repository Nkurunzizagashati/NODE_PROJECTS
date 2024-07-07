const errorHandler = (req, res, err) => {
  if (err.code === 11000) {
    return res.status(400).json({ error: "Email already in use" });
  }

  return res.status(500).json({ error: "something went wrong" });
};

export default errorHandler;
