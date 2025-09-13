import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    isAddToCart: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const foodModel = mongoose.model("foods", foodSchema);

export default foodModel;
