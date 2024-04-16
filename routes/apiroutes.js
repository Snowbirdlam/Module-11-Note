const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../db/db.json");

router.post("/api/notes", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Internal Server Error");
    }
    const notes = JSON.parse(data);

    const newNote = req.body;

    newNote.id = notes.length + 1;
    notes.push(newNote);

    fs.writeFile(filePath, JSON.stringify(notes, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.json(newNote);
    });
  });
});

router.get("/api/notes", (req, res) => {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Internal Server Error");
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.delete("/api/notes/:id",
  (req, res) => {
    const noteId = parseInt(req.params.id);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }

      let notes = JSON.parse(data);
      const updatedNotes = notes.filter((note) => note.id !== noteId);

      fs.writeFile(filePath, JSON.stringify(updatedNotes, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return res.status(500).send("Internal Server Error");
        }
        res.json(204).send();
      });
    });
  });
  
module.exports = router;
