class WebController {
  async renderHome(request, response, next) {
    try {
      if (request.session.user) {
        return response.status(200).render("Home", {
          title: "Início",
          session: request.session.user || null,
        });
      } else {
        return response.status(200).render("Login", {
          title: "Iniciar sessão",
          session: request.session.user || null,
          error: request.flash("error"),
          success: request.flash("success"),
          filled: {
            email: request.flash("filled_email") || null,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async renderAdmin(request, response, next) {
    try {
      if (request.session.user) return response.redirect("/");

      return response.status(200).render("Admin", {
        title: "Painel Administrativo",
        session: request.session.user || null,
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
        error: request.flash("error"),
        success: request.flash("success"),
        filled: {
          username: request.flash("filled_username") || null,
          email: request.flash("filled_email") || null,
        },
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
