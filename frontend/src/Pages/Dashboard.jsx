import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Expense Tracker Dashboard
      </h1>

      <div className="flex gap-4">
        <Link
          to="/add"
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Add Expense
        </Link>

        <Link
          to="/list"
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Expense List
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
