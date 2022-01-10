class Authentication {
  async token(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) return response.json({ error: "Usuário não autorizado, token não fornecido." });

    try {
      return next();
    } catch (err) {
      return response.json({ error: "Token inválido..." });
    }
  }

  async session(request, response, next) {
    const authSession = request.session.user;

    if (!authSession) return response.redirect("/");

    try {
      return next();
    } catch (err) {
      return response.json({ error: "Token inválido..." });
    }
  }
}

module.exports = new Authentication();