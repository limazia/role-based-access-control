const { constantError } = require("../constants/error");

class Authentication {
  async session(request, response, next) {
    const authSession = request.session.user;

    try {
      if (!authSession) return response.redirect("/");

      return next();
    } catch (err) {
      return request.flash("error", constantError.NO_SESSION_FOUND);
    }
  }
}

module.exports = new Authentication();