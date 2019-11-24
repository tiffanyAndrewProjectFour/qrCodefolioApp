//2. Set up namespace qrApp:
const qrApp = {};

qrApp.baseUrl = "https://api.happi.dev/v1/qrCode?";
qrApp.key = "49e3d00PdlOr6kNixKJddRalSAi41U3oPuUTmv6qDwobjjD9C9k0i0MW";

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
  qrApp
    .getQr(data, bgColor, width)
    .then(function(data) {
      $("#qrCode").html(
        `<img src=${data.qrcode} alt="qrCode" id = "qrCodeShow">
      <button> <a href="${data.qrcode}" download="qrCode"> download </a> </button>
      <button id = "printMe"> print </button>`
      );
      $("#printMe").on("click", function() {
        $("h1").hide();
        $("form").hide();
        $("button").hide();
        $("#qrCodeShow").show();
        $("#qrCodeShow").addClass("print");
        $("body").css("height", "50vh");
        window.print();
      });
    })
    .fail(function(error) {
      $("body").html(
        "<h1> There is some error on the page. Please try again later </h1>"
      );
    });
};

qrApp.userSubmission = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const userSite = $("#userUrl").val();
    const userWidth = parseInt($("#width").val());
    const userColor = $("#color")
      .val()
      .substring(1);

    if (userWidth > 300 || userWidth < 130 || isNaN(userWidth)) {
      $(".errorMessage").html(`Please enter value from 130px to 300px!`);
      return false;
    } else {
      $(".errorMessage").empty("");
    }

    qrApp.displayQr(userSite, userColor, userWidth);
  });
};

qrApp.userTwitterSubmission = function() {
  $("#twitterForm").on("submit", function(e) {
    e.preventDefault();
    const userTwitter = $("#userTwitter").val();
    console.log(userTwitter);
    const userWidth = parseInt($("#width").val());
    console.log(userWidth);
    const userColor = $("#color")
      .val()
      .substring(1);

    // if (userTwitter !== "") {
    //   const userTwitterAppend = `twitter://user?screen_name=${userTwitter}`;
    //   qrApp.displayQr(userTwitterAppend, userColor, userWidth);
    // } else {
    //   $(".errorTwitterMessage").html(`Please enter your Twitter Handle`);
    //   return false;
    // }

    if (userWidth > 300 || userWidth < 130 || isNaN(userWidth)) {
      $(".errorMessage").html(`Please enter value from 130px to 300px!`);
      return false;
    } else {
      $(".errorMessage").empty("");
    }

    qrApp.displayQr(userTwitterAppend, userColor, userWidth);
  });
};

// preview of changes
$(".width").on("keyup", function() {
  $(".imgTest").css("width", this.value);
  $(".imgTest").css("height", this.value);
});

$("input[type='color']").on("change", function() {
  $(".imgTest").css("background-color", this.value);
});

//4. Pull user data from form with following parameters:
//a) User's portfolio URL.
//b) Buttons for user to select what format they want their qr code generated as (JPEG, PNG, SVG).
//5. Make AJAX request to goqr.me to endpoint: https://api.qrserver.com/v1/create-qr-code/?data=

//6. Generate the users qr code to the page based on users parameters.

//3. Init to start the function
qrApp.init = function() {
  qrApp.userSubmission();
  qrApp.userTwitterSubmission();
  $("#userUrl").val("www.");
  $("#width").val("");
  $("#color").val("#ffffff");
  $(".errorMessage").empty();
  $("#userTwitter").val("");
  $("#userWebsite").click(function() {
    $(".userUrlForm").show();
    $(".userTwitterForm").hide();
    $(".userContactForm").hide();
  });

  $("#userTwitter").click(function() {
    $(".userUrlForm").hide();
    $(".userTwitterForm").show();
    $(".userContactForm").hide();
  });

  $("#userContact").click(function() {
    $(".userUrlForm").hide();
    $(".userTwitterForm").hide();
    $(".userContactForm").show();
  });

  $("#reset").click(function() {
    window.location.reload();
  });
};

//1. Document ready
$(function() {
  qrApp.init();
  $(".userTwitterForm").hide();
  $(".userContactForm").hide();
});

// technical challenge
// 1. the first API we found does not work because it produces an image instead of a JSON file.
// 2. git commit pull and push
