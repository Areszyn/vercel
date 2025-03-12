const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Simple Home Route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ✅ Example Notes Route (Modify as Needed)
app.get("/notes", async (req, res) => {
  res.json({ message: "📝 Notes API is working!" });
});

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Export for Vercel
module.exports = app;
