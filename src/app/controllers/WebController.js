class WebController {
  async renderLanding(request, response, next) {
    try {
      return response.status(200).render("Landing");
    } catch (error) {
      next(error);
    }
  }

  async renderHome(request, response, next) {
    try {
      return response.status(200).render("Settings", {
        title: "Configurações",
        session: request.session.user || null,
      });
    } catch (error) {
      next(error);
    }
  }

  async renderSettings(request, response, next) {
    try {
      return response.status(200).render("Settings", {
        title: "Configurações",
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