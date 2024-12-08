import express from "express";
import { generateJwtToken, User } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express();

router.get("/", (req, res) => {});

//Signup

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "User already Exist...." });
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedpassword,
      contact: req.body.contact,
    }).save();

    const token = generateJwtToken(user._id);
    res.status(200).json({ message: "signed sucessfully....", token: token });
  } catch (error) {
    console.log(error);
  }
});

//Login user

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials...." });
    }

    const validatePassward = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassward) {
      return res.status(400).json({ message: "Invalid credentials...." });
    }

    const token = generateJwtToken(user._id);
    //localStorage.setItem("token", token);
    res.status(200).json({
      message: "Logedin sucessfully....",
      token: token,
      useName: user.name,
    });
  } catch (error) {
    console.log(error);
  }
});

//find user

export const userRouter = router;
