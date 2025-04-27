const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Sample route
app.get("/api/queue", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Downtown Medical Center",
      queue: 12,
      waitTime: "15-20 min",
      status: "Normal",
    },
    {
      id: 2,
      name: "Westside DMV Office",
      queue: 35,
      waitTime: "45-60 min",
      status: "Busy",
    },
    {
      id: 3,
      name: "Eastside Tax Office",
      queue: 58,
      waitTime: "90-120 min",
      status: "Very Busy",
    },
  ]);
});

// Start server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
