const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const expenseRoutes = require("./routes/expenseRoutes")

dotenv.config();

const app = express();

// DB Connect
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS (Important for Cookies)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
