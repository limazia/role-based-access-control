class Authentication {
  async session(request, response, next) {
    const authSession = request.session.user;

    if (!authSession) return response.redirect("/");

    try {
      return next();
    } catch (err) {
      return response.json({ error: "Nenhuma sessão foi encontrada!" });
    }
  }
}

module.exports = new Authentication();