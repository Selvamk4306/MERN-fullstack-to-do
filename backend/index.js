const express = require("express");
const dotenv = require("dotenv");
const to_dos = require("./routes/to-do-list-route");

// import database connection file
const DbConnection = require("./database_connection");

dotenv.config();

const app = express();

DbConnection();

const PORT = 4000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "To-Do List Home Page :-)"
    });
});

app.use("/to-dos", to_dos);

app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
});