import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This email is already in use"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if googleId is not present
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    googleId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
