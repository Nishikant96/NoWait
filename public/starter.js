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
    // class="dropdown-item"
    country_arr[i] +
    "</option>";
  document.getElementById("Locator").innerHTML = str;
}

// function getData(){

// }
var bangalore = { lat: 12.97, lng: 77.59 };
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5937, lng: 78.9629 },
    zoom: 4.5
  });
  // let data = getData();
  //To be Added Dynamically for given Locations
  var marker = new google.maps.Marker({
    position: bangalore,
    map: map,
    icon: "http://maps.google.com/mapfiles/ms/icons/blue.png"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: "<h5>Custom Data</h5>"
  });

  marker.addListener("mouseover", function() {
    infoWindow.open(map, marker);
  });
}

function zoomMapToState(StateResponse) {
  console.log(StateResponse.data);
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: StateResponse.data.Latitude,
      lng: StateResponse.data.Longitude
    },
    zoom: 12
  });
}

async function searchAction() {
  if (document.getElementById("Locator").value == 0) {
    alert("Please choose Location");
  } else {
    //Triggered when Search button Clicked
    var Str = country_arr[document.getElementById("Locator").value];
    await fetch(window.location.href + "SearchLocation?Location=" + Str)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        zoomMapToState(res);
      });
  }
}
