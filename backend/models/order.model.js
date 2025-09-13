import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: {
    type: String,
    enum: {
      values: [
        "Order Confirmed",
        "Preparing Your Order",
        "Out for delivery",
        "Delivered",
      ],
      message: `{VALUE} is not a valid status type`,
    },
    default: "Order Confirmed",
  },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
