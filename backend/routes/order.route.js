import express from "express";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  allOrders,
  updateOrderStatus,
} from "../controller/order.controller.js";
import userAuth from "../auth/user.auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", userAuth, placeOrder);
orderRouter.get("/myOrders", userAuth, userOrders);
orderRouter.get("/allOrders", allOrders);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/status", updateOrderStatus);

export default orderRouter;
