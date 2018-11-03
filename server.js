// GET and POST seem to be formatted properly but arent pushing to the page
// unsure how to set DELETE up on server or html (and why am I getting an error when setting the object up?)
// if there is time see if it works on Heroku too
// REQ.PARAMS.ID FOR DELETE ROUTE SET DATA ATTRIBUTE IN DELETE BUTTON TO THE ID FROM THE DB


var express = require("express");
var path = require("path");
var db = require("./db/connection");

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
  db.query("SELECT * FROM notes", function(err, dbNotes) {
    res.json(dbNotes);
  });
});


app.post("/api/notes", function(req, res) {
  console.log("req.body:", req.body);
  db.query("SELECT * FROM notes", function(err, dbSeated) {
    if (err) throw err;

    db.query("INSERT INTO notes SET ?", req.body, function(err, result) {
      if (err) throw err;
      res.json(true);
    });
  });
});

app.delete("/api/notes/:id", function(req, res) {
  db.query("DELETE FROM notes WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// // Clear all tables
// app.delete("/api/notes", function(req, res) {
//   db.query("DELETE FROM notes WHERE ?", function(err, result) {
//     if (err) throw err;
//     {
//       noteTitle: req.body.noteTitle,
//       note: req.body.note
//     }
//   });
// });

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});