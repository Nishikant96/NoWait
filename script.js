var PORT = process.env.PORT || 3306;
var express = require("express");
var mysql = require("mysql");
var app = express();
var path = require("path");
var http = require("http");
var server = http.Server(app);
app.use(express.static("public"));

//DB Credentials
//   // host: "remotemysql.com",
//   // user: "3p5jNBnwhk",
//   // password: "aQDdkJnzLF",
//   // database: "3p5jNBnwhk"
var connection = mysql.createPool({
  host: "185.210.145.1",
  user: "u198047102_nishikant",
  password: "u198047102_nishikant",
  database: "u198047102_NoWait"
});

app.get("/", function(req, resp) {
  //Mysql Queries Go here
  resp.sendFile(__dirname + "/index.html");
});

app.get("/SearchLocation", function(req, resp) {
  console.log("HTTP request Successful! " + req.query.Location);
  connection.query(
    "SELECT * FROM xx_india_location_all where City='" +
      req.query.Location +
      "'",
    function(error, rows, fields) {
      if (!error) {
        console.log("Query Successful for: " + req.query.Location);
        console.log(rows[0]);
        resp.send(rows[0]);
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
});

connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

app.get("/getAllLocations", function(req, resp) {
  console.log("HTTP request Successful for All Places! ");
  connection.query("SELECT * FROM xx_india_location_all", function(
    error,
    rows,
    fields
  ) {
    if (!error) {
      // console.log("Query Successful for: " + req.query.Location);
      console.log(rows[0]);
      resp.send(rows);
    } else {
      console.log("Query Failed! " + error);
    }
  });
});
connection.on("error", function(err) {
  console.log("[mysql error]", err);
});
///////////////////////////////
// const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.post("/post-test", (req, res) => {});
// app.post("/makeAppointment", function(req, resp) {
//   //Mysql Queries Go here
//   console.log("makeAppointment HTTP request Successful!");
//   console.log(req);

//   console.log("Got body:", req.body);
//   resp.sendStatus(200);
//   // resp.sendFile(__dirname + "/index.html");
//   // resp.send("Success rows");
// });
const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

app.post("/makeAppointment", (req, res) => {
  console.log("Got body:", req.body);
  res.sendStatus(200);
});
///////////////////////////////

app.get("/getShopLocations", function(req, resp) {
  console.log("getShopLocations HTTP request Successful!");
  connection.query("SELECT * FROM xx_store_locations_all", function(
    error,
    rows,
    fields
  ) {
    if (!error) {
      // console.log("Query Successful for: " + req.query.Location);
      console.log(rows[0]);
      resp.send(rows);
    } else {
      console.log("Query Failed! " + error);
    }
  });
});
connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

app.listen(PORT, function() {
  console.log("Listening on port!" + PORT);
}); //Port number given here
