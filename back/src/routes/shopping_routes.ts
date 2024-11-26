
import express from "express";
import { ShoppingCart } from "../models/shopping_model";

const router = express.Router();

router.post("/", async (req:any, res:any) => {
    const { description, amount } = req.body;
    const new_ShoppingCartping_item = new ShoppingCart({ description, amount});
    await new_ShoppingCartping_item.save();
    res.status(201).send(new_ShoppingCartping_item);
});

router.get("/", async (_, res) => {
    const ShoppingCarts = await ShoppingCart.find();
    res.send(ShoppingCarts);
});
 
router.get("/total", async (_, res) => {
    const total = await ShoppingCart.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    res.send({ total: total[0]?.total || 0 });
});

router.put("/:id", async (req:any, res:any) => {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    try {
        const updatedShoppingCart = await ShoppingCart.findByIdAndUpdate(
            id,
            { description, amount, date },
            { new: true, runValidators: true }
        );

        if (!updatedShoppingCart) {
            return res.status(404).send({ error: "ShoppingCart not found" });
        }

        res.send(updatedShoppingCart);
    } catch (error) {
        res.status(400).send({ error: "Failed to update ShoppingCart" });
    }
});

router.delete("/:id", async (req, res) => {
    await ShoppingCart.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;
