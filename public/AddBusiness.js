console.log("Inside Script.");
// var bangalore = { lat: 12.97, lng: 77.59 };
// var map;

// async function initMap() {
//   // window.initMap = function(){
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 20.5937, lng: 78.9629 },
//     zoom: 4.5
//   });

//To be Added Dynamically for given Locations
//   await fetch(window.location.href + "getAllLocations")
//     .then(response => response.json())
//     .then(res => {
//       // console.log(res);

//       //i + 3 to reduce pin density
//       for (var i = 0; i < res.length - 3; i = i + 3) {
//         var obj = res[i];
//         // console.log(obj);
//         var marker = new google.maps.Marker({
//           position: { lat: obj.Latitude, lng: obj.Longitude },
//           map: map,
//           icon: "http://maps.google.com/mapfiles/ms/icons/blue.png"
//         });
//         var infowindow = new google.maps.InfoWindow({
//           content: "<h5>" + obj.City + "</h5>"
//         });
//         marker.infowindow = infowindow;
//         marker.addListener("mouseover", function() {
//           return this.infowindow.open(map, this);
//         });
//         marker.addListener("mouseout", function() {
//           return this.infowindow.close(); //(map, this);
//         });
//         // console.log("Fetched " + obj.City);
//         //Attach click event to the marker.
//         (function(marker, obj) {
//           google.maps.event.addListener(marker, "click", function(e) {
//             console.log("Clicked " + obj.City);
//             zoomMapToState(obj);
//           });
//         })(marker, obj);
//       }
//     });
// }
// async function loadAllShops() {
//   await fetch(window.location.href + "getShopLocations")
//     .then(response => response.json())
//     .then(res => {
//       for (var i = 0; i < res.length; i++) {
//         var obj = res[i];
//         var marker = new google.maps.Marker({
//           position: { lat: obj.LatitudeStore, lng: obj.LongitudeStore },
//           map: map,
//           icon: "http://maps.google.com/mapfiles/ms/icons/blue.png"
//         });
//         var infowindow = new google.maps.InfoWindow({
//           content: "<h5>" + obj.StoreName + "</h5>"
//         });
//         marker.infowindow = infowindow;
//         marker.addListener("mouseover", function() {
//           return this.infowindow.open(map, this);
//         });
//         marker.addListener("mouseout", function() {
//           return this.infowindow.close(); //(map, this);
//         });
//         //Attach click event to the marker.
//         (function(marker, obj) {
//           google.maps.event.addListener(marker, "click", function(e) {
//             console.log("Clicked " + obj.StoreName);
//             markerAppointment(obj);
//           });
//         })(marker, obj);
//       }
//     });
// }
// function zoomMapToState(StateResponse) {
//   console.log(StateResponse);
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: {
//       lat: StateResponse.Latitude,
//       lng: StateResponse.Longitude
//     },
//     zoom: 11
//   });
//   loadAllShops();
// }
function validateForm() {
  return true;
}
////////////////////////
async function CreateStore() {
  console.log("Creating a new Store.");
  if (validateForm()) {
    await fetch(window.location.href + "/createStore", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        StoreName: document.getElementById("StoreName").value,
        Latitude: document.getElementById("Latitude").value,
        Longitude: document.getElementById("Longitude").value,
        Password: document.getElementById("pwd").value
      })
    })
      .then(res => res.json())
      .then(res => {
        //logic creation response
        console.log(res);
      });
  }
}
//////////////////////////
