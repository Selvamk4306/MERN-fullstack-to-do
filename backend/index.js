const express = require("express");
require("dotenv").config(); // ✅ correct
const path = require("path");

const to_dos = require("./routes/to-do-list-route");
const DbConnection = require("./database_connection");

const app = express();

// DB
DbConnection();

// Middleware
app.use(express.json());

// API routes FIRST ✅
app.use("/to-dos", to_dos);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running"
  });
});

// Serve frontend build (AFTER APIs) ✅
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
// });

// PORT (Render-safe) ✅
const PORT =  4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});