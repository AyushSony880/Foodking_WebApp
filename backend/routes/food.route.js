import express from "express";
import {
  addFood,
  removeFood,
  viewFoods,
} from "../controller/food.controller.js";
import upload from "../middleware/multer.js";

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.delete("/remove/:id", removeFood);
foodRouter.get("/view", viewFoods);

export default foodRouter;
