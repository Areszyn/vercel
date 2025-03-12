const express = require("express")
const router = express.Router()
const Note = require("../models/Note")

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 })
    res.json(notes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" })
    res.json(note)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a note
router.post("/", async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  })

  try {
    const newNote = await note.save()
    res.status(201).json(newNote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a note
router.put("/:id", async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: Date.now(),
      },
      { new: true },
    )

    if (!updatedNote) return res.status(404).json({ message: "Note not found" })
    res.json(updatedNote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" })
    res.json({ message: "Note deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
