const express = require("express");
const app = express();

app.use(express.json());

let history = [];

// Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// Version endpoint
app.get("/version", (req, res) => {
  res.json({ version: "v1" });
});

// Calculator API
app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

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

// History endpoint
app.get("/history", (req, res) => {
  res.json(history);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
