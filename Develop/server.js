const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");
const uuid = require('uuid')

const PORT = 3001;

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

    req.body.id = uuid();

    let noteBody = JSON.stringify(req.body);
  console.log(noteBody);

  fs.writeFile('./db/db.json',noteBody, (err) =>
    err
      ? console.error(err)
      : console.log(
          `Success`
        )
  );

  res.json(req.body)
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
