const express = require("express");
require("dotenv").config(); // ✅ correct
const path = require("path");
const cors = require("cors");

const to_dos = require("./routes/to-do-list-route");
const DbConnection = require("./database_connection");

const app = express();

// DB
DbConnection();

// Middleware
app.use(express.json());

app.use(cors({
    origin: '*'
}))

// API routes FIRST ✅
app.use("/to-dos", to_dos);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running"
  });
});

// PORT (Render-safe) ✅
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});