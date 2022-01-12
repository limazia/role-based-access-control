const bcrypt = require("bcrypt");
const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");

//const moment = require("moment");
//moment.locale("pt-br");

class AuthController {
  async userLogin(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("users").select("*").where({ email }).leftJoin("users_details", "users_details.permissions", "=", "users.id");
      request.flash("filled_email", email);

      if (!email) {
        request.flash("error", "Digite um e-mail");
        return response.redirect("/login");
      }

      if (!password) {
        request.flash("error", "Digite uma senha");
        return response.redirect("/login");
      }

      if (user.length >= 1) {
        if (!(await bcrypt.compare(password, user[0].password))) {
          request.flash("error", "Senha invalida");
          return response.redirect("/login");
        }

        user[0].password = undefined;
        request.session.user = user[0];

        return response.redirect("/home");
      } else {
        request.flash("error", "Usuário não encontrado");
        return response.redirect("/login");
      }
    } catch (err) {
      next(err);
    }
  }

  async userRegister(request, response, next) {
    try {
      const { name, email, password, confirmpassword } = request.body;
      const user = await connection("users").select("*").where({ email });
      const salt = bcrypt.genSaltSync(10);
      const passwordCrypt = bcrypt.hashSync(password, salt);
      const id = cryptoRandomString({ length: 15 });

      request.flash("filled_name", name);
      request.flash("filled_email", email);

      if (!name) {
        request.flash("error", "Digite um nome");
        return response.redirect("/register");
      }

      if (!email) {
        request.flash("error", "Digite um e-mail");
        return response.redirect("/register");
      } else {
        if (user.length > 0) {
          request.flash("error", "E-mail já registrado");
          return response.redirect("/register");
        }
      }

      if (!password) {
        request.flash("error", "Digite uma senha");
        return response.redirect("/register");
      }

      if (password != confirmpassword) {
        request.flash("error", "As senhas não coincidem");
        return response.redirect("/register");
      }

      const trx = await connection.transaction();

      await trx("users").insert({
        id,
        name,
        email,
        password: passwordCrypt,
      });

      await trx("users_details").insert({
        user_id: id,
        permissions: "[]",
      });

      await trx.commit();

      request.flash("success", "Conta criada com sucesso!");
      return response.redirect("/login");
    } catch (err) {
      next(err);
    }
  }

  async userLogout(request, response, next) {
    try {
      request.session.user = null;
      request.flash("filled_name", null);
      request.flash("filled_email", null);
      
      return response.redirect("/");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
