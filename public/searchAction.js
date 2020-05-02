function validateAppointmentForm() {
  var num = document.getElementById("Number").value;
  if (num.length != 10) {
    return false;
  }
  for (n = 0; n < num.length; n++) {
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
function validateCustomerForm() {
  let x = document.getElementById("email").value;
  let y = document.getElementById("pwd").value;
  let atposition = x.indexOf("@");
  let dotposition = x.lastIndexOf(".");
  let flag = 0;
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= x.length
  ) {
    document.getElementById("emailValidText").style.display = "block";
    flag = 1;
  }
  if (y.length == 0) {
    document.getElementById("passwordValidText").style.display = "block";
    flag = 1;
  }
  if (flag) return false;
  return true;
}
async function searchAppointment() {
  document.getElementById("numberValidText").style.display = "none";

  if (validateAppointmentForm()) {
    //Need to be separately designed Validate Form
    await fetch(window.location.href + "/searchAppointment", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Number: document.getElementById("Number").value
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let str = "";
        for (var i = 0; i < res.length; i++) {
          var obj = res[i];
          str =
            str +
            '<tr><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            obj.StoreName +
            "</td><td>" +
            obj.Token_Number +
            "</td><td>" +
            obj.Appointment_Status +
            "</td></tr>";
        }
        document.getElementById("CustomerBody").innerHTML = str;
        document.getElementById("CustomerRoot").style.display = "block";
      });
  } else {
    document.getElementById("numberValidText").style.display = "block";
  }
}

async function searchCustomers() {
  document.getElementById("emailValidText").style.display = "none";
  document.getElementById("passwordValidText").style.display = "none";
  if (validateCustomerForm()) {
    //Need to be separately designed Validate Form
    await fetch(window.location.href + "/searchCustomers", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        Password: document.getElementById("pwd").value
      })
    })
      .then(res => res.json())
      .then(res => {
        //logic creation response
        console.log(res);
        let str = "";
        for (var i = 0; i < res.length; i++) {
          var obj = res[i];
          str =
            str +
            '<tr><th scope="row">' +
            (i + 1) +
            "</th><td>" +
            obj.Customer_Name +
            "</td><td>" +
            obj.Appointment_Status +
            "</td><td>" +
            obj.User_Phone_Number +
            "</td></tr>";
        }
        document.getElementById("StoreBody").innerHTML = str;
        document.getElementById("StoreRoot").style.display = "block";
      });
  }
}
