import express from "express";
import {
  removeCartItem,
  increaseCartItem,
  decreaseCartItem,
  getCartItem,
} from "../controller/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/increase", increaseCartItem);
cartRouter.post("/decrease", decreaseCartItem);
cartRouter.post("/remove", removeCartItem);
cartRouter.get("/list", getCartItem);

export default cartRouter;
