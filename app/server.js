const express = require("express");
const path = require("path");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// In-memory history (for demo)
let history = [];

/**
 * Home Route (served automatically via index.html)
 * Optional fallback if needed
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 * Health Check Endpoint
 */
app.get("/health", (req, res) => {
  res.send("OK");
});

/**
 * Version Endpoint
 */
app.get("/version", (req, res) => {
  res.json({ version: "v3" });
});

/**
 * Calculator API
 */
app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  if (num1 === undefined || num2 === undefined || !operation) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let result;

  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "sub":
      result = num1 - num2;
      break;
    case "mul":
      result = num1 * num2;
      break;
    case "div":
      result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
      break;
    default:
      return res.status(400).json({ error: "Invalid operation" });
  }

  const record = { num1, num2, operation, result };
  history.push(record);

  res.json(record);
});

/**
 * History Endpoint
 */
app.get("/history", (req, res) => {
  res.json(history);
});

/**
 * Start Server
 */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SmartCalc server running on port ${PORT}`);
});
