const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const path = require("path");
let db = require("./db/db.json");
app.use(express.json());
app.use(express.static("public"));
const uuid = require('./helpers/uuid');


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

// Delete a note from notes page
app.delete("/api/notes/:id", async (req, res) => {

    // Get id param from clientside js on button click
    db = db.filter((note) => note.id !== req.params.id);

    res.json(db);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  })

// Server starts listening on a port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} http://localhost:${PORT}/`);
  });