//2. Set up namespace qrApp:
const qrApp = {};

qrApp.baseUrl = "https://api.happi.dev/v1/qrCode?";
qrApp.key = "49e3d00PdlOr6kNixKJddRalSAi41U3oPuUTmv6qDwobjjD9C9k0i0MW";

// calling the API
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

// this is to display the QR code to the page
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
        $(".logo").hide();
        $(".links").hide();
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

// submit the URL input to generate the QR code
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

// submit the twitter info to generate the QR code
qrApp.userTwitterSubmission = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const userTwitter = $("#userTwitterHandle").val();
    const userWidth = parseInt($("#widthTwitter").val());
    const userColor = $("#colorTwitter")
      .val()
      .substring(1);

    if (userTwitter === "") {
      $(".errorTwitter").html(`Please enter your Twitter Handle`);
      return false;
    } else {
      $(".errorTwitter").empty("");
    }

    if (userWidth > 300 || userWidth < 130 || isNaN(userWidth)) {
      $(".errorMessage").html(`Please enter value from 130px to 300px!`);
      return false;
    } else {
      $(".errorMessage").empty("");
    }

    if (userTwitter !== "") {
      const userTwitterAppend = `twitter://user?screen_name=${userTwitter}`;
      qrApp.displayQr(userTwitterAppend, userColor, userWidth);
    } else {
      $(".errorTwitter").html(`Please enter your Twitter Handle`);
      return false;
    }
  });
};

// submit the meCard info to generate the QR code
qrApp.meCard = function() {
  $("form").on("submit", function(e) {
    e.preventDefault();
    const userName = $("#userName").val();
    const userTel = $("#userPhone").val();
    const userEmail = $("#userEmail").val();
    const userUrl = $("#userUrlWebsite").val();
    const userWidth = parseInt($("#userWidthContact").val());
    const userColor = $("#userColor")
      .val()
      .substring(1);

    if (userName === "" && userTel === "") {
      $(".errorName").html(`Please enter name`);
      $(".errorTel").html(`Please enter valid phone number`);
      return false;
    } else {
      $(".errorName").html("");
      $(".errorTel").html("");
    }

    if (userName === "") {
      $(".errorName").html(`Please enter name`);
      return false;
    } else {
      $(".errorName").empty("");
    }

    if (userWidth > 300 || userWidth < 130 || isNaN(userWidth)) {
      $(".errorMessage").html(`Please enter value from 130px to 300px`);
      return false;
    } else {
      $(".errorMessage").empty("");
    }

    if (isNaN(parseInt(userTel))) {
      $(".errorTel").html(`Please enter valid phone number`);
      return false;
    } else {
      $(".errorTel").empty("");
    }

    if (
      userName !== "" &&
      userTel !== "" &&
      userUrl !== "" &&
      userEmail !== ""
    ) {
      const meCardAppend = `MECARD:N:${userName};TEL:${userTel};URL:${userUrl};EMAIL:${userEmail};;`;
      return qrApp.displayQr(meCardAppend, userColor, userWidth);
    } else if (userName !== "" && userTel !== "" && userEmail !== "") {
      const meCardAppend = `MECARD:N:${userName};TEL:${userTel};EMAIL:${userEmail};;`;
      return qrApp.displayQr(meCardAppend, userColor, userWidth);
    } else if (userName !== "" && userTel !== "" && userUrl !== "") {
      const meCardAppend = `MECARD:N:${userName};TEL:${userTel};URL:${userUrl};;`;
      return qrApp.displayQr(meCardAppend, userColor, userWidth);
    }
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

//3. Init to start the function
qrApp.init = function() {
  $(".userWebsiteLink").css("color", "#343039");

  qrApp.userSubmission();
  qrApp.userTwitterSubmission();
  qrApp.meCard();

  //clear all input when refreshing page
  $("#userUrl").val("www.");
  $("#width").val("");
  $("#color").val("#ffffff");
  $(".errorMessage").empty();

  $("#userTwitterHandle").val("");
  $("#widthTwitter").val("");
  $("#colorTwitter").val("#ffffff");
  $(".errorTwitter").empty();

  $("#userName").val("");
  $("#userPhone").val("");
  $("#userEmail").val("");
  $("#userUrlWebsite").val("www.");
  $("#userWidthContact").val("");
  $("#userColor").val("#ffffff");
  $(".errorName").empty();
  $(".errorTel").empty();

  //click WebsiteLink
  $("#userWebsiteLink").click(function() {
    $(".userUrlForm").show();
    $(".userTwitterForm").hide();
    $(".userContactForm").hide();
    $(".userWebsiteLink").css("color", "#343039");
    $(".userTwitterLink").css("color", "#f7f6f5");
    $(".userContactLink").css("color", "#f7f6f5");
  });

  //click TwitterLink
  $("#userTwitterLink").click(function() {
    $(".userUrlForm").hide();
    $(".userTwitterForm").show();
    $(".userContactForm").hide();
    $(".userWebsiteLink").css("color", "#f7f6f5");
    $(".userTwitterLink").css("color", "#343039");
    $(".userContactLink").css("color", "#f7f6f5");
  });

  //click contactLink
  $("#userContactLink").click(function() {
    $(".userUrlForm").hide();
    $(".userTwitterForm").hide();
    $(".userContactForm").show();
    $(".userWebsiteLink").css("color", "#f7f6f5");
    $(".userTwitterLink").css("color", "#f7f6f5");
    $(".userContactLink").css("color", "#343039");
  });

  // reset button
  $("input[type=reset]").click(function() {
    window.location.reload();
  });
};

//1. Document ready
$(function() {
  qrApp.init();
  $(".userTwitterForm").hide();
  $(".userContactForm").hide();
});
