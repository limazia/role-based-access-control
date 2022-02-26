const connection = require("../../database/connection");

class PrivilegedUser {
  _roles;

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

      const permissionsToArray = permissions.split(",").map(permission => permission.trim());

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

  hasPrivilege(perm) {
    this.roles.forEach(function (role) {
      if (role.hasPerm(perm)) {
        return true;
      }
    });

    return false;
  }
}

module.exports = new PrivilegedUser();
