
import express from "express";
import { Expense } from "../models/expense";

const router = express.Router();

router.post("/", async (req:any, res:any) => {
    const { description, amount, date } = req.body;
    const expense = new Expense({ description, amount, date });
    await expense.save();
    res.status(201).send(expense);
});

router.get("/", async (_, res) => {
    const expenses = await Expense.find();
    res.send(expenses);
});
 
router.get("/total", async (_, res) => {
    const total = await Expense.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    res.send({ total: total[0]?.total || 0 });
});

router.put("/:id", async (req:any, res:any) => {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            { description, amount, date },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).send({ error: "Expense not found" });
        }

        res.send(updatedExpense);
    } catch (error) {
        res.status(400).send({ error: "Failed to update expense" });
    }
});

router.delete("/:id", async (req, res) => {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

export default router;
