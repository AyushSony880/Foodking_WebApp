import express from "express";
import {
  login,
  logOut,
  signUp,
  trackLogin,
} from "../controller/user.controller.js";
import userAuth from "../auth/user.auth.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.get("/logout", logOut);
userRouter.get("/me", userAuth, trackLogin);

export default userRouter;
