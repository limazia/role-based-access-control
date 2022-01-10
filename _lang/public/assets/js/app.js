$(document).ready(function () {
  // Enable tooltip and popover
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
  $('[data-toggle="popover"]').popover();

  function setCookie(name, value, days) {
    let expires;
    let date = new Date();

    if (days) {
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function getCookie(name) {
    let nameEQ = encodeURIComponent(name) + "=";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    return null;
  }

  function deleteCookie(name) {
    createCookie(name, "", -1);
  }

  if (getCookie("changelog_view") !== "1") {
    $(window).on('load', function () {
      $('#changelog').modal('show');
    });
  } else {
    $('#changelog').css("display", "none");
  }

  $("#cchangelog").click(function () {
    setCookie("changelog_view", 1, 365);
  });
 
  let searchParams = new URLSearchParams(window.location.search)
  let param = searchParams.get('lang')

  if (param === "pt-BR") {
    setCookie("lang", "pt-BR", 365);
  } else if (param === "en-US") {
    setCookie("lang", "en-US", 365);
  } else {
    setCookie("lang", getCookie("lang"), 365);
  }

  if (getCookie("lang") === "pt-BR") {
    $("#languageItems").append('<a class="dropdown-item" href="/?lang=en-US" id="lang"><span class="flag-icon flag-icon-us mr-2"></span> English</a>');

    $("#languageDropdown").append('<span class="flag-icon flag-icon-br mr-1"></span> Português <i class="fas fa-chevron-down ml-1" style="font-size: 10px;"></i>');
  } else {
    $("#languageItems").append('<a class="dropdown-item" href="/?lang=pt-BR" id="lang"><span class="flag-icon flag-icon-br mr-2"></span> Português</a>');

    $("#languageDropdown").append('<span class="flag-icon flag-icon-us mr-1"></span> English <i class="fas fa-chevron-down ml-1" style="font-size: 10px;"></i>');
  }

});
