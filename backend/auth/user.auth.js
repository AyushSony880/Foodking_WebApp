import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.Token;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token not available...",
      });
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      Error: "Authentication failed...",
      message: error.message,
    });
  }
};

export default userAuth;
