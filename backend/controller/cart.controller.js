import Cart from "../models/cart.model.js";
import Food from "../models/food.model.js";

const increaseCartItem = async (req, res) => {
  try {
    const itemId = req.body.id;
    const isItem = await Food.findById(itemId);
    if (!isItem) {
      return res.json({
        message: "Item not found...",
      });
    }
    const isDataExist = await Cart.findOne({
      userId: req.user._id,
      itemId: itemId,
    });
    if (!isDataExist) {
      const cartItem = new Cart({
        userId: req.user._id,
        itemId: itemId,
        quantity: 1,
        isAddToCart: true,
      });
      await cartItem.save();
      return res.json({
        message: "Item added to cart...",
      });
    }
    isDataExist.quantity += 1;
    await isDataExist.save();

    return res.json({
      message: "quantity increased...",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Error to add to cart",
      message: error.message,
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const itemId = req.body.id;
    const isDataExist = await Cart.findOneAndDelete({
      userId: req.user._id,
      itemId: itemId,
    });

    if (!isDataExist) {
      return res.json({
        message: "Item not exist in cart",
      });
    }
    return res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Error to remove cart item..",
      message: error.message,
    });
  }
};

const decreaseCartItem = async (req, res) => {
  try {
    const itemId = req.body.id;
    const isDataExist = await Cart.findOne({ itemId: itemId });
    if (!isDataExist) {
      return res.json({ message: "Item not found in cart..." });
    }
    if (isDataExist.quantity === 1) {
      await isDataExist.deleteOne();
      return res.json({ message: "quantity decreased..." });
    }
    isDataExist.quantity -= 1;
    await isDataExist.save();
    return res.json({ message: "quantity decreased..." });
  } catch (error) {
    return res.status(500).json({
      Error: "Error to decrease quantity...",
      message: error.message,
    });
  }
};

const getCartItem = async (req, res) => {
  try {
    const data = await Cart.find({ userId: req.user._id }).populate("itemId");
    if (!data) {
      return res.json({ message: "Data not found..." });
    }

    return res.json({
      success: true,
      message: "Data fetched successfully....",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: "Error to fetch data...",
      message: error.message,
    });
  }
};

export { removeCartItem, increaseCartItem, decreaseCartItem, getCartItem };
