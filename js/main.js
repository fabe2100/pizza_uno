"use strict";

window.onload = init;
var url = "https://studenter.miun.se/~fabe2100/writeable/dt173g/projekt_webbservice/menuapi.php",
    url1 = "https://studenter.miun.se/~fabe2100/writeable/dt173g/projekt_webbservice/bookingapi.php";

function init() {
  getMenu();
}

function getMenu() {
  fetch(url).then(function (e) {
    if (200 == e.status) return e.json().then(function (e) {
      return writeMenu(e);
    })["catch"](function (e) {
      return console.log(e);
    });
  });
}

function writeMenu(e) {
  var t = document.getElementById("menu-list");
  e.forEach(function (e) {
    null != t && (t.innerHTML += "<li>".concat(e.type, "\n        ").concat(e.menuname, "<br>\n        ").concat(e.description, "<br>Pris:\n        ").concat(e.price, "<hr></li><br>"));
  });
}

var dateInput = document.getElementById("date"),
    personsInput = document.getElementById("persons"),
    timeInput = document.getElementById("time"),
    nameInput = document.getElementById("name"),
    mailInput = document.getElementById("mail"),
    phoneInput = document.getElementById("phone"),
    submitButton = document.getElementById("submit");

function createBooking(e) {
  e.preventDefault();
  var t = dateInput.value,
      n = personsInput.value,
      l = timeInput.value,
      u = nameInput.value,
      i = mailInput.value,
      o = phoneInput.value;

  if (t.length > 0 && n.length > 0 && l.length > 0 && u.length > 0 && i.length > 0 && o.length > 0) {
    var _e = JSON.stringify({
      date: t,
      persons: n,
      time: l,
      name: u,
      phone: o,
      mail: i
    });

    fetch(url1, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: _e
    }).then(function (e) {
      return e.json();
    }).then(function (e) {
      document.getElementById("info").innerHTML = "Bokning Skapad! Bekräftelsen har skickats till mailet!", clearForm();
    })["catch"](function (e) {
      return console.log(e);
    });
  } else {
    document.getElementById("error").innerHTML = "Se till att fylla alla fält!";
  }
}

function clearForm() {
  nameInput.value = "", dateInput.value = "", timeInput.value = "", personsInput.value = "", mailInput.value = "", phoneInput.value = "";
}

submitButton && submitButton.addEventListener("click", createBooking);
var hamburger = document.querySelector(".hamburger"),
    navLinks = document.querySelector(".nav-links"),
    links = document.querySelectorAll(".nav-links li");
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open"), links.forEach(function (e) {
    e.classList.toggle("fade");
  }), hamburger.classList.toggle("toggle");
});