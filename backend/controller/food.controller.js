import foodModel from "../models/food.model.js";
import Food from "../models/food.model.js";
import fs from "fs";

const addFood = async (req, res) => {
  try {
    const fileName = req.file.filename;
    const item = new Food({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: fileName,
    });

    const data = await item.save();
    return res.json({
      message: `${data.name} is added`,
      data: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeFood = async (req, res) => {
  try {
    const item = await foodModel.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.send("Item not found..!");
    }
    fs.unlink(`uploads/${item.image}`, (err) => {
      if (err) {
        res.send(err);
      }
    });
    return res.send({
      message: `${item.name} Item deleted..`,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const viewFoods = async (req, res) => {
  try {
    const allItems = await foodModel.find({});
    return res.json({
      data: allItems,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export { addFood, removeFood, viewFoods };
