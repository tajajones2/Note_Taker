const express = require("express");
const app = express();


// Root page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });


  // Notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });