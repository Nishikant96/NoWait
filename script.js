var PORT = process.env.PORT || 3306;
var express = require("express");
var mysql = require("mysql");
var app = express();
app.use(express.static("public"));
var path = require("path");
var http = require("http");
var server = http.Server(app);

//DB Credentials
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "3p5jNBnwhk",
  password: "aQDdkJnzLF",
  database: "3p5jNBnwhk"
});

// Check Database connection
connection.connect(function(error) {
  if (!error) {
    console.log("Connection Successful!");
  } else console.log("Connection Failed!");
});

app.get("/", function(req, resp) {
  //Mysql Queries Go here
  resp.sendFile(__dirname + "/index.html"); //Heroku Shit
});
//http://localhost:3306/SearchLocation?Location=Alappuzha
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
        // resp.json(rows[0]);
        resp.send({
          message: "success",
          data: rows[0]
        });
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
});

connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

app.listen(PORT, function() {
  console.log("Listening on port!" + PORT);
}); //Port number given here
