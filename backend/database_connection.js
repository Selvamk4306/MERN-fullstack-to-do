const mongoose = require("mongoose");

function DbConnection() {
    const URL = process.env.MONGO_URL;

    if (!URL) {
        console.error("❌ MONGO_URL is undefined. Check your .env file");
        return;
    }

    mongoose.connect(URL);

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("✅ Database connected successfully");
    });
}

module.exports = DbConnection;
