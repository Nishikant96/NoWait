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
app.post("/makeAppointment", (req, res) => {
  console.log("Got body:", req.body);

  ///Find Last Token Number
  connection.query(
    "SELECT MAX(Token_Number) AS Token_Number FROM xx_appointments_all where Store_Key_ID=" +
      req.body.str,
    function(error, rows, fields) {
      if (!error) {
        console.log("Phone: " + req.body.phone);
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
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
  connection.on("error", function(err) {
    console.log("[mysql error]", err);
  });
});
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

app.get("/about", function(req, resp) {
  resp.sendFile(__dirname + "/about.html");
});

app.get("/searchAction", function(req, resp) {
  resp.sendFile(__dirname + "/searchAction.html");
});

// app.get("/test", function(req, resp) {
//   resp.sendFile(__dirname + "/test.html");
// });

app.get("/AddBusiness", function(req, resp) {
  resp.sendFile(__dirname + "/AddBusiness.html");
});

app.post("/AddBusiness/createStore", (req, res) => {
  console.log("Got body:", req.body);

  //Insert a new Store
  connection.query(
    "SELECT MAX(Index_Key) AS 'Index' FROM xx_store_locations_all",
    function(error, rows, fields) {
      if (!error) {
        console.log(rows[0]);
        let Store_Index = rows[0].Index + 1;
        //Insert a new Store
        connection.query(
          "INSERT INTO xx_store_locations_all(Index_Key, StoreName, LatitudeStore, LongitudeStore, City) VALUES (" +
            Store_Index +
            "," +
            "'" +
            req.body.StoreName +
            "'" +
            "," +
            "'" +
            req.body.Latitude +
            "'" +
            "," +
            req.body.Longitude +
            "," +
            "'Manual'" +
            ")",
          function(error, rows, fields) {
            if (!error) {
              console.log(
                "Data Inserted Successfully for " + req.body.StoreName
              );
              // res.json({ Status: "Success", Token: Store_Index });
              connection.query(
                "INSERT INTO xx_users_all ( User_Email, Password, Store_Number) VALUES ('" +
                  req.body.email +
                  "'" +
                  "," +
                  "'" +
                  req.body.Password +
                  "'" +
                  "," +
                  Store_Index +
                  ")",
                function(error, rows, fields) {
                  if (!error) {
                    console.log(
                      "User Created Successfully for " + req.body.email
                    );
                    res.json({ Status: "Success", Token: Store_Index });
                  } else {
                    console.log("Query Failed! " + error);
                    res.json({
                      Status: "Failed",
                      Token: "User Creation Failed!"
                    });
                  }
                }
              );
            } else {
              console.log("Query Failed! " + error);
              res.json({ Status: "Failed", Token: "Store Creation Failed!" });
            }
          }
        );
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
  connection.on("error", function(err) {
    console.log("[mysql error]", err);
  });
});

// searchCustomers

app.post("/searchAction/searchAppointment", function(req, resp) {
  console.log("Search Mode on! ");
  connection.query(
    "SELECT a.*,b.StoreName FROM xx_appointments_all a, xx_store_locations_all b WHERE a.Store_Key_Id = b.Index_Key and a.User_Phone_Number = " +
      req.body.Number,
    function(error, rows, fields) {
      if (!error) {
        console.log(rows[0]);
        resp.send(rows);
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
});
connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

//

app.post("/searchAction/searchCustomers", function(req, resp) {
  console.log(
    "SELECT * FROM xx_appointments_all WHERE Store_Key_Id in (Select Store_Number from xx_users_all where User_Email ='" +
      req.body.email +
      "' and Password='" +
      req.body.Password +
      "') "
  );
  connection.query(
    "SELECT * FROM xx_appointments_all WHERE Store_Key_Id in (Select Store_Number from xx_users_all where User_Email ='" +
      req.body.email +
      "' and Password='" +
      req.body.Password +
      "') ",
    function(error, rows, fields) {
      if (!error) {
        console.log(rows[0]);
        resp.send(rows);
      } else {
        console.log("Query Failed! " + error);
      }
    }
  );
});
connection.on("error", function(err) {
  console.log("[mysql error]", err);
});

//////////////////////////////////
app.listen(PORT, function() {
  console.log("Listening on port!" + PORT);
}); //Port number given here
