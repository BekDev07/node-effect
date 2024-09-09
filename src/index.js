require("dotenv").config();
require("express-async-errors");
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const { testConnection } = require("./db/dbConnect");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
app.use(express.json());

app.use("/api/v1", productRoutes);
app.use("/api/v1", stockRoutes);
app.use("*", errorHandlerMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  try {
    await testConnection(); // Test the database connection
    // Start your application server here
    app.listen(process.env.PORT, () => {
      console.log("App started successfully");
    });
  } catch (err) {
    console.error("Failed to start the application", err.stack);
    process.exit(1);
  }
})();
