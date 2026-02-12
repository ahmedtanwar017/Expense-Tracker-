import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/Axios";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password
      });

      setMessage(res.data.message);

      // Redirect after successful login
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1000);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {message && (
          <p className="text-center text-red-500 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4">
          Don't have an account?
          <a href="/register" className="text-blue-500 ml-1">
            Register
          </a>
        </p>

      </div>

    </div>
  );
}

export default Login;
