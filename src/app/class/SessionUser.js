const connection = require("../../database/connection");
const moment = require("moment");

moment.locale("pt-br");

class SessionUser {
  async getSession() {
    return (request, response, next) => {
      const session = request.session.user;

      return session ? session : null;
    };
  }

  async createSessionByEmail(email) {
    //const user = await connection.raw('SELECT * FROM users WHERE email = :email', { email });
    const user = await connection("users").select("*").where({ email });

    if (user.length >= 1) {
      const { id, username, permissions, updateAt, createdAt } = user[0];

      const permissionsToArray = permissions
        .split(",")
        .map((permission) => permission.trim());

      const privUser = {
        id,
        username,
        email,
        permissions: permissionsToArray,
        updateAt,
        createdAt,
      };

      return privUser;
    }
  }

  async updateSession(request, response, next) {
    const session = request.session.user;
    const user = await this.createSessionByEmail(session ? session.email : null);

    const timeSession = moment(session ? session.updateAt : null).format("LTS");
    const timeUser = moment(session ? user.updateAt : null).format("LTS");

    if (timeSession !== timeUser) {
      request.session.reload(function (err) {
        request.session.user = user;

        request.session.save(function (err) {
          return next();
        });
      });
    } else {
      return next();
    }
  }
}

module.exports = new SessionUser();