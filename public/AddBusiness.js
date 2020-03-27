function validateForm() {
  if (ValidateCoordinates() && validateCredentials()) return true;
  return false;
}
function validateCredentials() {
  if (
    document.getElementById("pwd").value !=
    document.getElementById("pwd2").value
  ) {
    return false;
  }
  var emailVar = document.getElementById("email").value;
  var pwdVar = document.getElementById("pwd").value;
  var StoreNameVar = document.getElementById("StoreName").value;
  var atposition = emailVar.indexOf("@");
  var dotposition = emailVar.lastIndexOf(".");
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= emailVar.length ||
    pwdVar.length == 0 ||
    StoreNameVar.length == 0
  ) {
    return false;
  }
  return true;
}
function ValidateCoordinates() {
  var latitude = document.getElementById("Latitude").value;
  var longitude = document.getElementById("Longitude").value;
  var reg = new RegExp("^-?[0-9]{1,3}(?:.[0-9]{1,10})?$"); //
  if (reg.exec(latitude) && reg.exec(longitude)) {
    return true;
  } else {
    return false;
  }
}

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
        $("#StoreModal").modal("toggle");
      });
  } else {
    alert("Please enter Correct Details!");
  }
}
function returnHome() {
  let string = window.location.href;
  window.location.href = string.substr(0, string.length - 11);
}
function confirmPassword() {
  let var1 = document.getElementById("pwd").value;
  let var2 = document.getElementById("pwd2").value;
  if (var1 === var2) {
    document.getElementById("CheckPwd").innerHTML =
      "<div style='color:green;'>The Passwords are Matching!</div>";
  }
  if (var1 != var2) {
    document.getElementById("CheckPwd").innerHTML =
      "<div style='color:red;'>The Passwords do not Match!</div>";
  }
  if (var2 == "") {
    document.getElementById("CheckPwd").innerHTML = "";
  }
}
