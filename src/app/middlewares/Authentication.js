class Authentication {
  async session(request, response, next) {
    const authSession = request.session.user;

    if (!authSession) return response.redirect("/");

    try {
      return next();
    } catch (err) {
      return request.flash("error", "Nenhuma sessão foi encontrada!");
    }
  }

  async permission(request, response, next) {
    const session = request.session.user;

    try {
      if (session) {
        //return response.redirect("/");

        return next();
      } else {
        return next();
      }
    } catch (err) {
      return request.flash("error", "Nenhuma sessão foi encontrada!");
    }
  }
}

module.exports = new Authentication();