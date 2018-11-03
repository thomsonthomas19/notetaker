var mysql = require("mysql");

var db;

// Sets up db to connect locally or on JAWSDB if deployed
if (process.env.JAWSDB_URL) {
  db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "notes_db"
  });
}

// Turns BOOLEAN 0s and 1s returned from the db into true and false
db.config.typeCast = function(field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; // 1 = true, 0 = false
  }
  return next();
};

// Export the connection so it's available in other parts of the app
module.exports = db;