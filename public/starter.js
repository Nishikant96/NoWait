var country_arr = new Array(
  "Your Location",
  "Agra",
  "Asansol",
  "Abohar",
  "Agartala",
  "Ahmadabad",
  "Ahmadnagar",
  "Aizawl",
  "Ajmer",
  "Akola",
  "Alappuzha",
  "Aligarh",
  "Alipur Duar",
  "Allahabad",
  "Alwar",
  "Ambala",
  "Amravati",
  "Amritsar",
  "Aurangabad",
  "Aurangabad",
  "Bakshpur",
  "Bamanpuri",
  "Baramula",
  "Barddhaman",
  "Bareilly",
  "Belgaum",
  "Bellary",
  "Bengaluru",
  "Bhagalpur",
  "Bharatpur",
  "Bharauri",
  "Bhatpara",
  "Bhavnagar",
  "Bhilai",
  "Bhilwara",
  "Bhiwandi",
  "Bhiwani",
  "Bhopal",
  "Bhubaneshwar",
  "Bhuj",
  "Bhusaval",
  "Bidar",
  "Bijapur",
  "Bikaner",
  "Bilaspur",
  "Brahmapur",
  "Budaun",
  "Bulandshahr",
  "Calicut",
  "Chanda",
  "Chandigarh",
  "Chennai",
  "Chikka Mandya",
  "Chirala",
  "Coimbatore",
  "Cuddalore",
  "Cuttack",
  "Daman",
  "Davangere",
  "Dehra Dun",
  "Delhi",
  "Dhanbad",
  "Dhulia",
  "Dibrugarh",
  "Dindigul",
  "Dispur",
  "Diu",
  "Faridabad",
  "Firozabad",
  "Fyzabad",
  "Gangtok",
  "Gaya",
  "Ghandinagar",
  "Ghaziabad",
  "Gopalpur",
  "Gulbarga",
  "Guntur",
  "Gurgaon",
  "Guwahati",
  "Gwalior",
  "Haldia",
  "Haora",
  "Hapur",
  "Haripur",
  "Hatisa",
  "Hindupur",
  "Hisar",
  "Hospet",
  "Hubli",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jabalpur",
  "Jaipur",
  "Jammu",
  "Jamshedpur",
  "Jhansi",
  "Jodhpur",
  "Jorhat",
  "Kagaznagar",
  "Kakinada",
  "Kalyan",
  "Karimnagar",
  "Karnal",
  "Karur",
  "Kavaratti",
  "Khammam",
  "Khanapur",
  "Kochi",
  "Kohima",
  "Kolar",
  "Kolhapur",
  "Kolkata",
  "Kollam",
  "Kota",
  "Krishnanagar",
  "Krishnapuram",
  "Kumbakonam",
  "Kurnool",
  "Latur",
  "Lucknow",
  "Ludhiana",
  "Machilipatnam",
  "Madurai",
  "Malegaon Camp",
  "Mangalore",
  "Mardanpur",
  "Mathura",
  "Meerut",
  "Mirzapur",
  "Moradabad",
  "Mumbai",
  "Muzaffarnagar",
  "Muzaffarpur",
  "Mysore",
  "Nagercoil",
  "Nanded",
  "Nandyal",
  "Nara",
  "Nasik",
  "Navsari",
  "Nellore",
  "New Delhi",
  "Nizamabad",
  "Ongole",
  "Pali",
  "Panaji",
  "Panchkula",
  "Panipat",
  "Parbhani",
  "Pathankot",
  "Patiala",
  "Patna",
  "Pilibhit",
  "Porbandar",
  "Port Blair",
  "Proddatur",
  "Puducherry",
  "Pune",
  "Puri",
  "Purnea",
  "Raichur",
  "Raipur",
  "Rajahmundry",
  "Rajapalaiyam",
  "Rajkot",
  "Rampura",
  "Ranchi",
  "Ratlam",
  "Raurkela",
  "Rohtak",
  "Saharanpur",
  "Saidapur",
  "Saidpur",
  "Salem",
  "Samlaipadar",
  "Sangli",
  "Saugor",
  "Shahbazpur",
  "Shiliguri",
  "Shillong",
  "Shimla",
  "Shimoga",
  "Sikar",
  "Silchar",
  "Silvassa",
  "Sirsa",
  "Solapur",
  "Sonipat",
  "Srinagar",
  "Surat",
  "Tezpur",
  "Thanjavur",
  "Tharati Etawah",
  "Thiruvananthapuram",
  "Tiruchchirappalli",
  "Tirunelveli",
  "Tirupati",
  "Tiruppur",
  "Tiruvannamalai",
  "Tonk",
  "Tumkur",
  "Tuticorin",
  "Udaipur",
  "Ujjain",
  "Vadodara",
  "Valparai",
  "Varanasi",
  "Vellore",
  "Vishakhapatnam",
  "Vizianagaram",
  "Warangal"
);
var str = "";
for (var i = 0; i < country_arr.length; i++) {
  str +=
    '<option value="' +
    i +
    '" class="dropdown-item">' +
    country_arr[i] +
    "</option>";
  document.getElementById("Locator").innerHTML = str;
}

// var bangalore = { lat: 12.97, lng: 77.59 };
var map;
async function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 4.5
  });

  //To be Added Dynamically for given Locations
  await fetch(window.location.href + "getAllLocations")
    .then(response => response.json())
    .then(res => {
      //i + 3 to reduce pin density
      for (var i = 0; i < res.length - 3; i = i + 3) {
        var obj = res[i];
        var marker = new google.maps.Marker({
          position: { lat: obj.Latitude, lng: obj.Longitude },
          map: map,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue.png"
        });
        var infowindow = new google.maps.InfoWindow({
          content: "<h5>" + obj.City + "</h5>"
        });
        marker.infowindow = infowindow;
        marker.addListener("mouseover", function() {
          return this.infowindow.open(map, this);
        });
        marker.addListener("mouseout", function() {
          return this.infowindow.close(); //(map, this);
        });
        //Attach click event to the marker.
        (function(marker, obj) {
          google.maps.event.addListener(marker, "click", function(e) {
            zoomMapToState(obj);
          });
        })(marker, obj);
      }
    });
}
async function loadAllShops() {
  await fetch(window.location.href + "getShopLocations")
    .then(response => response.json())
    .then(res => {
      for (var i = 0; i < res.length; i++) {
        var obj = res[i];
        var marker = new google.maps.Marker({
          position: { lat: obj.LatitudeStore, lng: obj.LongitudeStore },
          map: map,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue.png"
        });
        var infowindow = new google.maps.InfoWindow({
          content: "<h5>" + obj.StoreName + "</h5>"
        });
        marker.infowindow = infowindow;
        marker.addListener("mouseover", function() {
          return this.infowindow.open(map, this);
        });
        marker.addListener("mouseout", function() {
          return this.infowindow.close(); //(map, this);
        });
        //Attach click event to the marker.
        (function(marker, obj) {
          google.maps.event.addListener(marker, "click", function(e) {
            console.log("Clicked " + obj.StoreName);
            markerAppointment(obj);
          });
        })(marker, obj);
      }
    });
}
function zoomMapToState(StateResponse) {
  console.log(StateResponse);
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: StateResponse.Latitude,
      lng: StateResponse.Longitude
    },
    zoom: 11
  });
  loadAllShops();
}

async function searchAction() {
  document.getElementById("ChooseLocation").style.display = "none";
  if (document.getElementById("Locator").value == 0) {
    document.getElementById("ChooseLocation").style.display = "block";
  } else {
    //Triggered when Search button Clicked
    var Str = country_arr[document.getElementById("Locator").value];
    await fetch(window.location.href + "SearchLocation?Location=" + Str)
      .then(response => response.json())
      .then(res => {
        zoomMapToState(res);
      });
  }
}

function markerAppointment(obj) {
  // $Store_Name$  $Address$ $Shop_key_ID$
  document.body.innerHTML = document.body.innerHTML
    .replace("$Store_Name$", obj.StoreName)
    .replace("$Address$", obj.StoreName + ", " + obj.City)
    .replace("$Shop_key_ID$", "'" + obj.Index_Key + "'");
  $(document).ready(function() {
    $("#myModal").modal();
    $("#myModal").on("hidden.bs.modal", function() {
      document.body.innerHTML = document.body.innerHTML
        .replace(obj.StoreName, "$Store_Name$")
        .replace(obj.StoreName + ", " + obj.City, "$Address$")
        .replace("'" + obj.Index_Key + "'", "$Shop_key_ID$");
      //Map not responding after modal closes. Reloaded below.
      map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: obj.LatitudeStore,
          lng: obj.LongitudeStore
        },
        zoom: 11
      });
      loadAllShops();
      //
    });
  });
}
function validateNumber() {
  var num = document.getElementById("customer_number").value;
  if (num.length != 10) {
    return false;
  }

  for (n = 0; n < num.length; n++) {
    // console.log(n);
    digit =
      (num.charCodeAt(n) >= 48 && num.charCodeAt(n) <= 57) ||
      num.charCodeAt(n) == 46 ||
      num.charCodeAt(n) == 45;
    if (!digit) {
      return false;
    }
  }
  return true;
}

function validateModal() {
  var flag = true;
  if (document.getElementById("customer_name").value == "") {
    document.getElementById("ValidateUserName").style.display = "block";
    flag = false;
  }
  if (!validateNumber()) {
    document.getElementById("ValidateNumber").style.display = "block";
    // alert("Please add Valid Data");
    flag = false;
  }
  return flag;
}

async function GetAppointment(Store_key_id) {
  document.getElementById("ValidateUserName").style.display = "none";
  document.getElementById("ValidateNumber").style.display = "none";
  console.log("Getting Store Appointment for: " + Store_key_id);
  if (validateModal()) {
    await fetch(window.location.href + "makeAppointment", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: document.getElementById("customer_number").value,
        str: Store_key_id,
        cust_name: document.getElementById("customer_name").value
      })
    })
      .then(res => res.json())
      .then(res =>
        //Give Confirmation of Appointment
        {
          giveConfirmation(res);
        }
      );
  }
}

function giveConfirmation(res) {
  console.log(res);
  document.body.innerHTML = document.body.innerHTML.replace(
    "$Token_Number$",
    "is: " + res.Token
  );
  $(document).ready(function() {
    $("#ConfirmModal").modal();
    $("#ConfirmModal").on("hidden.bs.modal", function() {
      document.body.innerHTML = document.body.innerHTML.replace(
        "is: " + res.Token,
        "$Token_Number$"
      );
    });
  });
}
