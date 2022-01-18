$(document).ready(function () {
  // Conecta no servidor
  const socket = io("http://localhost:3000");
  const chatBody = $("#chat-body");

  if (chatBody.length) {
    chatBody.scrollTop(chatBody.get(0).scrollHeight);
  } 

  // Renderiza a mensagem na DIV
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

  function renderMessageB(message) {
    $(".messages").append(`<div class="answer left">
    <div class="avatar">
      <img src="assets/images/avatar1.jpg" alt="${message.author}">
      <div class="icon-box" data-toggle="tooltip" data-placement="left" title="Administrador">
        <i class="fas fa-user-crown"></i>
      </div>
    </div>
    <div class="text">${message.message}</div>
    <small class="time">11:38 AM</small>
  </div>`);
  }

  function disconnect() {
    socket.send(socket.socket.sessionid + " is disconnected.");
    socket.disconnect();
  }

  // Recebe as mensagens anteriores
  socket.on("previousMessages", function (messages) {
    for (message of messages) {
      renderMessage(message);
    }
  });

  // Recebe a Mensagem e chama o renderizador
  socket.on("receivedMessage", function (message) {
    renderMessage(message);
  });

  socket.on("blueMessage", (message) => {
    renderMessageB(message);
  });

  // Verifica quando é enviado uma mensagem
  $("#chat").submit(function (event) {
    event.preventDefault();

    const author = $("#name").val();
    const message = $("input[name=message]").val();

    if (message.length) {
      const messageObject = {
        author,
        message,
      };

      // Renderiza a mensagem
      renderMessage(messageObject);

      // Envia a mensagem pro socket no Back-End
      socket.emit("sendMessage", messageObject);
      chatBody.scrollTop(chatBody.get(0).scrollHeight);
      $("input[name=message]").val("");
    }
  });
});
