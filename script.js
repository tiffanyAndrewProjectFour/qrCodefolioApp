//2. Set up namespace qrApp:
const qrApp = {};

qrApp.baseUrl = "https://api.happi.dev/v1/qrcode?";
qrApp.key = "49e3d00PdlOr6kNixKJddRalSAi41U3oPuUTmv6qDwobjjD9C9k0i0MW";

//https://api.happi.dev/v1/qrcode?data=Hello%20World&width=&dots=000000&bg=FFFFFF&apikey=49e3d00PdlOr6kNixKJddRalSAi41U3oPuUTmv6qDwobjjD9C9k0i0MW

qrApp.getQr = function(qrQuery, qrColor, qrWidth) {
  const qrPromise = $.ajax({
    url: `${qrApp.baseUrl}`,
    method: "GET",
    dataType: "json",
    data: {
      apikey: qrApp.key,
      data: qrQuery,
      bg: qrColor,
      width: qrWidth
    }
  });
  return qrPromise;
};

qrApp.displayQr = function(data, bgColor, width) {
  qrApp.getQr(data, bgColor, width).then(function(data) {
    $("#qrCode").html(
      `<a href="${data.qrcode}" download="qrCode"> <img src=${data.qrcode} alt="qrCode" > </a>`
    );
  });
};

// preview of changes
$(".width").on("change", function() {
  $(".imgTest").css("width", this.value);
  $(".imgTest").css("height", this.value);
});

$("input[type='color']").on("change", function() {
  $(".imgTest").css("background-color", this.value);
});

qrApp.userSubmission = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const userSite = $("#userUrl").val();
    const userWidth = parseInt($("#width").val());
    console.log(userWidth);
    const userColor = $("#color")
      .val()
      .substring(1);

    qrApp.displayQr(userSite, userColor, userWidth);
  });
};

//4. Pull user data from form with following parameters:
//a) User's portfolio URL.
//b) Buttons for user to select what format they want their qr code generated as (JPEG, PNG, SVG).
//5. Make AJAX request to goqr.me to endpoint: https://api.qrserver.com/v1/create-qr-code/?data=

//6. Generate the users qr code to the page based on users parameters.

//3. Init to start the function
qrApp.init = function() {
  qrApp.userSubmission();
};

//1. Document ready
$(function() {
  qrApp.init();
});

// technical challenge
// 1. the first API we found does not work because it produces an image instead of a JSON file.
