const Expense = require("../model/expense-model");

// Add Expense
const addExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Expenses
const listallExpense = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateExpenseByName = async (req, res) => {
  try {
    const { name, amount, category, date } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Expense name is required" });
    }

    // Update expense by name
    const updatedExpense = await Expense.findOneAndUpdate(
      { name: name },          // filter
      { amount, category, date }, // fields to update
      { new: true }            // return the updated document
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addExpense, listallExpense, deleteExpense, updateExpenseByName}