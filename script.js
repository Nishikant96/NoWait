var PORT = 3306; // process.env.PORT ||
var express = require("express");
var mysql = require("mysql");
var app = express();
app.use(express.static("public"));
var path = require("path");
/*
var http = require("http");
var server = http.Server(app);
// app.use(express.static(path.join(__dirname)));

server.listen(PORT, function() {
  console.log("Http Server is running at port " + PORT);
});
*/
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
  connection.query("SELECT * FROM xx_india_location_all", function(
    error,
    rows,
    fields
  ) {
    if (!error) {
      console.log("Query Successful!");
      console.log(rows);
    } else {
      console.log("Query Failed!");
    }
  });
  //   resp.send('<h1>We are now in business</h1>')

  resp.sendFile(__dirname + "/index.html"); //Heroku Shit
});
connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

app.listen(PORT, function() {
  console.log("Listening on port!" + PORT);
}); //Port number given here
