import bcryptjs from "bcryptjs";

const hashPass = async (password) => {
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const passwordMatches = bcryptjs.compare(password, hashedPassword);
  return passwordMatches;
};
export { hashPass, comparePassword };
