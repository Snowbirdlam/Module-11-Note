const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../db/db.json");

router.get("/", (req, res) => {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      throw err;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;
