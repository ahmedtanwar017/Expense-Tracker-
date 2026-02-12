import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Axios";

function AddExpense() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "", // ✅ added description
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses/add", formData); // backend expects description too
      alert("Expense Added Successfully");
      navigate("/list");
    } catch (error) {
      console.error(error);
      alert("Error Adding Expense");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 font-bold text-center">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          onChange={handleChange}
          className="border p-2 w-full rounded"
          rows={3}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
        >
          Save
        </button>

      </form>
    </div>
  );
}

export default AddExpense;
