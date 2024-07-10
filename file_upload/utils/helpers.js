import bcryptjs from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 * @async
 * @function hashPass
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 * @throws {Error} - If hashing fails.
 */
const hashPass = async (password) => {
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

/**
 * Compares a plain text password with a hashed password.
 * @async
 * @function comparePassword
 * @param {string} password - The plain text password to compare.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 * @throws {Error} - If comparison fails.
 */
const comparePassword = async (password, hashedPassword) => {
  const passwordMatches = await bcryptjs.compare(password, hashedPassword);
  return passwordMatches;
};

export { hashPass, comparePassword };
