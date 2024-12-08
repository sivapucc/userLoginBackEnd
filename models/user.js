import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  contact: {
    required: true,
    type: Number,
  },
});

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETKEY);
};
const User = mongoose.model("user", userSchema);
export { User, generateJwtToken };
