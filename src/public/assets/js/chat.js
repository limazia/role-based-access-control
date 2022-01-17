$(document).ready(function () {
  const roomsAvailables = $("#rooms_available > a");

  roomsAvailables.on("click", function () {
    const selectedRoom = $(this).attr("id");

    selectedRoom.addClass("active");
  });
});
