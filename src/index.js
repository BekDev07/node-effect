require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const { testConnection } = require("./db/dbConnect");

const app = express();
app.use(express.json());

app.use("/api", (req, res) => {
  console.log("salom");
});

// app.use("/api", productRoutes);
// app.use("/api", stockRoutes);

// app.js

// Initialize the database connection and handle startup logic
(async () => {
  try {
    await testConnection(); // Test the database connection
    // Start your application server here
    console.log("App started successfully");
  } catch (err) {
    console.error("Failed to start the application", err.stack);
    process.exit(1);
  }
})();
