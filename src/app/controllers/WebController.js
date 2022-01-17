const moment = require("moment");
const connection = require("../../database/connection");

moment.locale("pt-br");

class WebController {
  async renderLanding(request, response, next) {
    try {
      if (request.session.user) return response.redirect("/home");
      
      return response.status(200).render("Landing");
    } catch (error) {
      next(error);
    }
  }

  async renderLogin(request, response, next) {
    try {
      if (request.session.user) return response.redirect("/home");

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
      if (request.session.user) return response.redirect("/home");
        
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

  async renderHome(request, response, next) {
    try {
      const rooms = await connection("rooms").orderBy("createdAt", "desc");
      //.leftJoin("users_balance", "users_balance.balance_user", "=", "users.id")

      const serializedRooms = rooms.map((item) => {
        const {
          room_id,
          room_title,
          room_name,
          room_private,
          room_photo,
          updateAt,
          createdAt
        } = item;

        return {
          room_id,
          room_title,
          room_name,
          room_private: room_private === 1 ? true : false,
          room_photo,
          updateAt: moment(updateAt).format("LL"),
          createdAt: moment(createdAt).format("LL"),
        };
      });

      return response.status(200).render("Home", {
        title: "Início",
        session: request.session.user || null,
        rooms: serializedRooms,
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