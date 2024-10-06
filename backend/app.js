const express = require("express");
const cors = require("cors");
const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");

const app = express();

// Using express built-in JSON parser
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Change to your frontend domain if different
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Set up routes
app.use(authRoutes);
app.use("/events", eventRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error); // Log error details
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// Start server
const server = app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
