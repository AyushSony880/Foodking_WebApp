import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, },
    itemId: { type: mongoose.Schema.ObjectId,ref:"foods" },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel;
