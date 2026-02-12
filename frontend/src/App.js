import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../src/Pages/Login"
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard"
import AddExpense from "./Pages/AddExpense";
import ExpenseList from "./Pages/ExpenseList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/list" element={<ExpenseList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
