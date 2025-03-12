const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const noteRoutes = require("./routes/notes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err))

// Routes
app.use("/api/notes", noteRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Export for Vercel
module.exports = app
