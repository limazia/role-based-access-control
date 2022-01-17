$(document).ready(function () {
  const roomsAvailables = $("#rooms_available > a");

  roomsAvailables.click(function () {
    const selectedRoom = $(this).attr("id");

    $("a.list-group-item.active").removeClass("active");
    $(this).addClass("active");

    const roomPhoto = $("a.list-group-item.active").find("img").attr("src");
    const roomTitle = $("a.list-group-item.active").find(".room-title").text();
    const roomName = $("a.list-group-item.active").find(".room-name").text();

    if (roomsAvailables.hasClass("active")) {
      $(".room-selected-photo").attr("src", roomPhoto);
      $(".room-selected-title").text(roomTitle);
      $(".room-selected-name").text(roomName);

      $("#chat_landing").css("display", "none");
      $("#chat_box").css("display", "block");
    }
  });
});
