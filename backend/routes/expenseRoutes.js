const express = require("express");
const router = express.Router();
const { addExpense,listallExpense,deleteExpense,updateExpenseByName } = require("../controllers/expenseController")

// Add Expense
router.post("/add", addExpense )

// Get All Expenses
router.get("/list", listallExpense )

// Delete Expense
router.delete("/:id", deleteExpense )

// Update expense
router.put("/update", updateExpenseByName);

module.exports = router;
