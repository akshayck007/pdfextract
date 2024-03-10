import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    //PASSWORD MISSMATCH
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password missmatch" });
    }

    //USERNAME NOT UNIQUE
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists!" });
    }

    //BCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //CREATE USER
    const newUser = new User({
      username,
      password: hashedPass,
      email,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      newUser.save();

      res.status(201).json({ message: "Account Registered!", username, email });
    } else {
      res
        .status(400)
        .json({ error: "user not created , some error God knows What!" });
    }
  } catch (error) {
    console.log("Error signing up: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordMatching = bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordMatching) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res
      .status(200)
      .json({ message: "login Successfull", userId: user._id, username });
  } catch (error) {
    console.log("error login in: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt-access-token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    console.log("error login in: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
