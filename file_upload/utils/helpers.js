import bcryptjs from "bcryptjs";

const hashPass = async (password) => {
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(password, salt);
  return hashedPassword;
};

export { hashPass };
