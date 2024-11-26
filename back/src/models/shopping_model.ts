
import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

export const ShoppingCart = mongoose.model("Shop", ShopSchema);
