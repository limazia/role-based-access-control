const moment = require("moment");

const connection = require("../../database/connection");
const { getPhoto } = require("../../helpers/chat.helper");
const { getAllRooms } = require("../../helpers/while.helper");

moment.locale("pt-br");

class WebController {
  async renderHome(request, response, next) {
    try {
      if (request.session.user) {
        return response.status(200).render("Home", {
          title: "Início",
          session: request.session.user || null,
          rooms: await getAllRooms(...["createdAt", "desc"]),
        });
      } else {
        return response.status(200).render("Landing");
      }
    } catch (error) {
      next(error);
    }
  }

  async renderLogin(request, response, next) {
    try {
      if (request.session.user) return response.redirect("/");

      return response.status(200).render("Login", {
        title: "Iniciar sessão",
        session: request.session.user || null,
        error: request.flash('error'),
        success: request.flash('success'),
        filled: {
          email: request.flash('filled_email') || null,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async renderRegister(request, response, next) {
    try {
      if (request.session.user) return response.redirect("/");
        
      return response.status(200).render("Register", {
        title: "Criar conta",
        session: request.session.user || null,
        error: request.flash('error'),
        success: request.flash('success'),
        filled: {
          username: request.flash('filled_username') || null,
          email: request.flash('filled_email') || null,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async renderRoom(request, response, next) {
    try {
      const { room_name } = request.params;
      const { username } = request.session.user;
      const room = await connection("rooms").orderBy("createdAt", "desc").where({ room_name });

      if (room.length == 0) {
        response.redirect("/");
      }
 
      /*
      if (room_name) {
        //request.io.to(user_socket).emit("match", { other_dev: targetDev });
        request.io.emit("joinRoom", { name: username, room: room_name });
      }
      */
      
      return response.status(200).render("Room", {
        title: `${room[0].room_title} (#${room[0].room_name})`,
        session: request.session.user || null,
        rooms: await getAllRooms(...["createdAt", "desc"]),
        room: {
          room_photo: getPhoto(room[0].room_photo),
          room_title: room[0].room_title,
          room_name: room[0].room_name,
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async renderPageNotFound(request, response, next) {
    try {
      return response.status(404).redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WebController();