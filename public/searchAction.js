// console.log("Inside Script.");
function validateForm() {
  return true;
}
async function searchAppointment() {
  if (validateForm()) {
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
  }
}

async function searchCustomers() {
  if (validateForm()) {
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
