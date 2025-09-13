import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const PORT = process.env.PORT || 5000;
import foodRouter from "./routes/food.route.js";
import userRouter from "./routes/user.route.js";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cartRouter from "./routes/cart.route.js";
import userAuth from "./auth/user.auth.js";
import orderRouter from "./routes/order.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  })
);
app.use(cookieParser());

app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/cart", userAuth, cartRouter);
app.use("/order", orderRouter);
app.use("/image", express.static("uploads"));




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`port is listen at ${PORT}`);
  });
});
