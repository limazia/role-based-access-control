$(document).ready(function () {
  // Conecta no servidor
  const socket = io("http://localhost:3000");
  const roomsAvailables = $("#rooms_available > a");
  const chatBody = $("#chat-body");
  const username = $("#name");
  const message = $("input[name=message]");

  if (chatBody.length) {
    chatBody.scrollTop(chatBody.get(0).scrollHeight);
  }

  function renderMessage(message) {
    $(".messages").append(`<div class="answer right">
    <div class="avatar">
      <img src="/cdn/avatar1.jpg" alt="${message.author}">
      <div class="icon-box" data-toggle="tooltip" data-placement="left" title="Administrador">
        <i class="fas fa-user-crown"></i>
      </div>
    </div>
    <div class="text">${message.message}</div>
    <small class="time">11:38 AM</small>
  </div>`);
  }

  roomsAvailables.click(function () {
    const selectedRoom = $(this).attr("id");

    console.log(selectedRoom)
  });
 
  // Verifica quando é enviado uma mensagem
  $("#chat").submit(function (event) {
    event.preventDefault();

    if (message.length) {
      const messageObject = {
        username: username.val(),
        message: message.val(),
      };

      // Renderiza a mensagem
      renderMessage(messageObject);

      // Envia a mensagem pro socket no Back-End
      socket.emit("chat message", messageObject);
      chatBody.scrollTop(chatBody.get(0).scrollHeight);
      message.val("");
    }
  });
});
