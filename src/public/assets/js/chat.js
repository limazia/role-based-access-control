$(document).ready(function () {
  const socket = io("http://localhost:3000");

  const queryString = window.location.pathname;
  const nameRoom = queryString.replace("/room/", "");

  const username = $("#username");
  const discriminator = $("#discriminator");
  const message = $("input[name=message]");

  const usersList = $(".users_list");

  if (nameRoom != "/home" || nameRoom != "/" || nameRoom != "/login" || nameRoom != "/register") {
    socket.emit("joinRoom", { name: username.text(), room: nameRoom });
  }
 
  function scrollSmoothToBottom() {
    const chatBody = $("#chat-body");

    if (chatBody.length) {
      chatBody.scrollTop(chatBody.get(0).scrollHeight);
    }

    chatBody.scrollTop(chatBody.get(0).scrollHeight);
  }

  function renderMessage(message) {
    //const momentTimestamp = moment.utc(message.timestamp);

    if (true) {
      $(".messages").append(`
        <div class="answer right">
          <div class="avatar">
            <img src="/cdn/avatar1.jpg" alt="${message.author}">
            <div class="icon-box" data-toggle="tooltip" data-placement="left" title="Administrador">
              <i class="fas fa-user-crown"></i>
            </div>
          </div>
          <div class="text">${message.message}</div>
          <small class="time">11:38 AM</small>
        </div>
      `);
    } else {
      $(".messages").append(`
        <div class="answer left">
          <div class="avatar">
            <img src="/cdn/avatar1.jpg" alt="${message.author}">
            <div class="icon-box" data-toggle="tooltip" data-placement="left" title="Administrador">
              <i class="fas fa-user-crown"></i>
            </div>
          </div>
          <div class="name">${message.username}<small>${message.discriminator}</small></div>
          <div class="text">${message.message}</div>
          <small class="time">11:38 AM</small>
        </div>
      `);
    }
  }

  socket.on("users", (users) => {
    for (user of users) {
      usersList.append(`<small>${user.name}</small>`);
    }
  });

  socket.on("notifications", (notification) => {
    $("#notifications").append(`<small class="text-muted">${notification.description}</small>`);
  });

  $("#chat").submit(function (event) {
    event.preventDefault();

    if (message.length && message.val().trim()) {
      const reg = /<(.|\n)*?>/g;
      const messageObject = {
        username: $.trim(username.text()),
        message: message.val(),
      };

      if (reg.test(message.val()) == true) {
        alert("Sorry, that is not allowed!");
      } else {
        socket.emit("sendMessage", messageObject);
        renderMessage(messageObject);
      }

      scrollSmoothToBottom();
      message.val("");
    }
  });
});
