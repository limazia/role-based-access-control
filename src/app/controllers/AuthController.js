const bcrypt = require("bcrypt");
const cryptoRandomString = require("crypto-random-string");
const moment = require("moment");

const connection = require("../../database/connection");
const { getAvatar, getRolePermission } = require("../../helpers/chat.helper");

moment.locale("pt-br");

class AuthController {
  async userLogin(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("users")
        .select("*")
        .where({ email })
        .leftJoin("users_details", "users_details.user_id", "=", "users.id")
        .leftJoin("roles", "roles.role_id", "=", "users_details.role");
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

        const {
          id,
          username,
          email,
          discriminator,
          avatar,
          role,
          role_class,
          role_permissions,
          updateAt,
          createdAt
        } = user[0];

        const serializedUser = {
          id,
          username,
          email,
          discriminator,
          avatar: getAvatar(avatar),
          role,
          role_class,
          role_permissions: getRolePermission(role_permissions),
          updateAt: moment(updateAt).format("LL"),
          createdAt: moment(createdAt).format("LL"),
        };

        request.session.user = serializedUser;

        return response.redirect("/");
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
      const { username, email, password, confirmpassword } = request.body;
      const user = await connection("users").select("*").where({ email });
      const salt = bcrypt.genSaltSync(10);
      const passwordCrypt = bcrypt.hashSync(password, salt);
      const id = cryptoRandomString({ length: 15 });
      const discriminator = cryptoRandomString({ length: 5, type: "numeric" });

      request.flash("filled_username", username);
      request.flash("filled_email", email);

      if (!username) {
        request.flash("error", "Digite um nome de usuário");
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
        username,
        email,
        password: passwordCrypt,
        discriminator
      });

      await trx("users_details").insert({
        user_id: id,
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
      request.flash("filled_username", null);
      request.flash("filled_email", null);
      
      return response.redirect("/");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();