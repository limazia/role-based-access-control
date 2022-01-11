class AuthController {
  async userLogin(request, response, next) {
    try {
      return response.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  async userRegister(request, response, next) {
    try {
      return response.redirect("/");
    } catch (err) {
      next(err);
    }
  }

  async userLogout(request, response, next) {
    try {
      request.session.user = null;
      
      return response.redirect("/");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();