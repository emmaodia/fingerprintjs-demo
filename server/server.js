const express = require("express");
const app = express();
var cors = require("cors");
const port = 5000;
var db = require("./db");
var md5 = require("md5");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const {
  FingerprintJsServerApiClient,
  Region,
} = require("@fingerprintjs/fingerprintjs-pro-server-api");

const TimeChecker = require("./deb");

const apiKey = process.env.FPJS_KEY;
const client = new FingerprintJsServerApiClient({
  region: Region.Global,
  apiKey: apiKey,
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/api/users", (request, response, next) => {
  var sql = "SELECT * from user";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      response.status(400).json({ error: err.message });
      return;
    }

    response.json({
      message: "success",
      data: rows,
    });
  });
});

app.post("/api/signup", (request, response) => {
  var errors = [];
  if (!request.body.password) {
    errors.push("No password specified");
  }
  if (!request.body.username) {
    errors.push("No username specified");
  }
  if (errors.length) {
    response.status(400).json({ error: errors.join(",") });
    return;
  }
  var data = {
    username: request.body.username,
    password: md5(request.body.password),
    VisitorID: request.body.visitorId,
  };
  var sql = "INSERT INTO user (username, password,VisitorID) VALUES (?,?,?)";
  var params = [data.username, data.password, data.VisitorID];
  console.log("Again", data.VisitorID);
  db.run(sql, params, function (err, result) {
    if (err) {
      response.status(400).json({ error: err.message });
      return;
    }
    response.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.post("/api/login", async (request, response) => {
  try {
    const { username, password, VisitorID } = request.body;
    console.log(username, password, VisitorID);
    if (!(username && password)) {
      response.status(404).send("Enter ALL credentials");
    }
    let user = [];
    console.log("here");
    const sql = "SELECT * FROM user WHERE username = ?";
    db.all(sql, username, async (error, rows) => {
      if (error) {
        response.status(400).json({ error: error.message });
        return;
      }

      rows.forEach((row) => {
        user.push(row);
      });

      if (!user[0]) {
        response.status(401);
        return response.json({ error: "Invalid username or password" });
      }
      console.log(user[0]);

      if (user[0]) {
        console.log("OK");

        const filters = {
          limit: 5,
        };
        /**
         * Open an array to store the timestamps.
         * Call the TimeChecker method to calculate the difference between the timestamp at index[0] and index[4]
         * Check to ensure that % login attempts under 5 minutes are rejected.
         */
        let setTime = [];
        await client
          .getVisitorHistory(user[0].visitorID, filters)
          .then((visitorHistory) => {
            visitorHistory.visits.map((result) => {
              setTime.push(result.timestamp);
            });
          });

        const result = TimeChecker(setTime[0], setTime[1]);

        if (result === true) {
          return response
            .status(401)
            .send(
              "We detected multiple log in attempts for this user, but we didn't perform the login action"
            );
        }

        const token = jwt.sign(
          { user_id: user[0].Id, username: user[0].username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        user[0].Token = token;
      } else {
        return response.status(400).send("No Match");
      }
      console.log(user);
      return response.status(200).send({ message: "Login Successful", user });
    });
  } catch (error) {
    return error;
  }
});

app.use(function (request, response) {
  response.status(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
