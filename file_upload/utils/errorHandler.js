/**
 * Error handler function for handling specific errors.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Error} err - Error object to be handled.
 * @returns {Object} JSON response with appropriate error message and status code.
 */
const errorHandler = (req, res, err) => {
  if (err.code === 11000) {
    return res.status(400).json({ error: "Email already in use" });
  }

  return res.status(500).json({ error: "Something went wrong" });
};

export default errorHandler;
