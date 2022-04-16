const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require('uniqid');
const { json } = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//API ROUTES

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
    notes[0].id = uuid()
    req.body.id = uuid();
    console.log(uuid())

    let noteBody = JSON.stringify(req.body);
    console.log(noteBody);
    notes.push(req.body)

  fs.writeFile('./db/db.json',JSON.stringify(notes), (err) =>
    err
      ? console.error(err)
      : console.log(
          `Success`
        )
  );

  res.json(notes)
});

// HTML ROUTES
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
