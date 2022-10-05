const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const path = require("path");


// Root page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Display notes from db to notes page
app.get("/api/notes", (req, res) => {
  // const notes = JSON.stringify(db);
  res.send(db);
});

// Add new note from form
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  // check note info for empty data
  if (title != "" && text != "") {
    const newNote = {
      id: uuid(),
      title,
      text,
    };

    db.push(newNote);
    const noteString = JSON.stringify(db, null, "\t");

    // Write string to file
    fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(`${newNote.title} as been written to JSON file`)
    );
  }
  res.json(db);
});
