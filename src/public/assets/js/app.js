$(document).ready(function () {
  // Enable tooltip and popover
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
  $('[data-toggle="popover"]').popover();

  if (getCookie("changelog_view") !== "1") {
    $(window).on("load", function () {
      $("#changelog").modal("show");
    });
  }

  $("#cchangelog").click(function () {
    setCookie("changelog_view", 1, 365);
  });
});
