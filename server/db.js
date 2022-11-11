var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username text UNIQUE, 
            password text, 
            Token text,
            visitorID text,
            timestamp number
            )`,
      (err) => {
        if (err) {
          // Table already created
          // console.log(err);
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO user (username, password, Token, VisitorID) VALUES (?,?,?,?)";
          db.run(insert, ["admin", md5("admin123456")]);
          db.run(insert, ["user", md5("user123")]);
          db.run(insert, ["user", md5("user123")]);
        }
      }
    );
  }
});

module.exports = db;
