import React, { useEffect, useState } from "react";
import API from "../Services/Axios";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [editingTitle, setEditingTitle] = useState(""); // Title being edited
  const [updateData, setUpdateData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
    paymentMethod: "",
    notes: "",
  });

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses/list");
      setExpenses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete expense by id
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing an expense
  const startEdit = (expense) => {
    setEditingTitle(expense.title);
    setUpdateData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date ? expense.date.split("T")[0] : "",
      description: expense.description || "",
      paymentMethod: expense.paymentMethod || "",
      notes: expense.notes || "",
    });
  };

  // Handle input change in update form
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/expenses/update", updateData);
      setEditingTitle(""); // close edit form
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const total = expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Expense List</h2>
      <h3 className="mb-4 font-bold">Total: ₹ {total}</h3>

      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="border p-4 mb-4 rounded shadow flex flex-col gap-2"
        >
          {editingTitle === expense.title ? (
            // Update form
            <form
              onSubmit={handleUpdate}
              className="flex flex-col gap-2 w-full"
            >
              <input
                type="text"
                name="amount"
                value={updateData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border px-2 py-1 rounded w-32"
                required
              />
              <input
                type="text"
                name="category"
                value={updateData.category}
                onChange={handleChange}
                placeholder="Category"
                className="border px-2 py-1 rounded w-48"
              />
              <input
                type="date"
                name="date"
                value={updateData.date}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-48"
              />
              <input
                type="text"
                name="description"
                value={updateData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border px-2 py-1 rounded w-64"
              />
              <input
                type="text"
                name="paymentMethod"
                value={updateData.paymentMethod}
                onChange={handleChange}
                placeholder="Payment Method"
                className="border px-2 py-1 rounded w-48"
              />
              <input
                type="text"
                name="notes"
                value={updateData.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="border px-2 py-1 rounded w-64"
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTitle("")}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display expense details
            <>
              <div className="flex flex-col gap-1">
                <p><strong>Title:</strong> {expense.title}</p>
                <p><strong>Amount:</strong> ₹ {expense.amount}</p>
                <p><strong>Category:</strong> {expense.category}</p>
                {expense.date && (
                  <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                )}
                {expense.description && (
                  <p><strong>Description:</strong> {expense.description}</p>
                )}
                {expense.paymentMethod && (
                  <p><strong>Payment Method:</strong> {expense.paymentMethod}</p>
                )}
                {expense.notes && <p><strong>Notes:</strong> {expense.notes}</p>}
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEdit(expense)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
