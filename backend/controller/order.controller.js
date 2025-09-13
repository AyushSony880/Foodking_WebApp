import dotenv from "dotenv";
dotenv.config();
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

const placeOrder = async (req, res) => {
  const frontend_url = "https://foodking880.netlify.app/";
  try {
    const newOrder = new Order({
      userId: req.user._id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });

    await Cart.deleteMany({ userId: req.user._id });
    return res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      Error: "Error to place order",
      message: error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Paid" });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "payment fail" });
    }
  } catch (error) {
    return res.json({ success: false, message: "Error to verify payment" });
  }
};

const userOrders = async (req, res) => {
  const userId = req.user._id;
  try {
    const items = await Order.find({ userId: userId });
    res.json({
      message: "data fetched",
      data: items,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const allOrders = async (req, res) => {
  try {
    const items = await Order.find({});
    res.json({
      message: "data fetched",
      data: items,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { value, id } = req.body;

    if (!value || !id) {
      return res.status(400).json({ message: "value and id are required" });
    }

    const result = await Order.findByIdAndUpdate(
      id,
      { status: value },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ message: "Status updated successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
export { placeOrder, verifyOrder, userOrders, allOrders, updateOrderStatus };
