class WebController {
  async renderLanding(request, response, next) {
    try {
      return response.status(200).render("Landing");
    } catch (error) {
      next(error);
    }
  }

  async renderLogin(request, response, next) {
    try {
      return response.status(200).render("Login", {
        title: "Iniciar sessão",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderRegister(request, response, next) {
    try {
      return response.status(200).render("Register", {
        title: "Criar conta",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderHome(request, response, next) {
    try {
      return response.status(200).render("Home", {
        title: "Início",
        session: request.session.user || null,
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