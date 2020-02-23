var PORT = process.env.PORT || 3306;
var express = require("express");
var mysql = require("mysql");
var app = express();
var path = require("path");
var http = require("http");
var server = http.Server(app);
app.use(express.static("public"));
app.use(express.json());
const bodyParser = require("body-parser");
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
app.post("/makeAppointment", (req, res) => {
  console.log("Got body:", req.body);

  ///Find Last Token Number
  connection.query(
    "SELECT MAX(Token_Number) AS Token_Number FROM xx_appointments_all where Store_Key_ID=" +
      req.body.str,
    function(error, rows, fields) {
      if (!error) {
        console.log(rows[0]);
        var Token_Number_New = rows[0].Token_Number;
        if (rows[0].Token_Number === null) {
          Token_Number_New = 0;
        }
        Token_Number_New++;
        //Insert an Appointment
        connection.query(
          "INSERT INTO xx_appointments_all(Store_Key_Id, User_Phone_Number, Customer_Name, Token_Number, Appointment_Status) VALUES (" +
            +req.body.str +
            "," +
            req.body.phone +
            "," +
            "'" +
            req.body.cust_name +
            "'" +
            "," +
            Token_Number_New +
            "," +
            "'P'" +
            ")",
          function(error, rows, fields) {
            if (!error) {
              console.log(
                "Data Inserted Successfully for " + req.body.cust_name
              );
              res.json({ Status: "Success", Token: Token_Number_New });
            } else {
              console.log("Query Failed! " + error);
              res.json({ Status: "Failed", Token: "Null" });
            }
          }
        );
        // res.send(" " + Token_Number_New);
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
  connection.on("error", function(err) {
    console.log("[mysql error]", err);
  });
  ///
  // res.json({ "200": "Success" });
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
