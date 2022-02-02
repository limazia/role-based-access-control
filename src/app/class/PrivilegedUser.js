const connection = require("../../database/connection");
const Role = require("./Role");

class PrivilegedUser {
  _roles;
 
  async getByUsername(username) {
    const result = await connection("users").where({ username });

    if (result.length > 0) {
      let privUser = {
        id: result[0]["id"],
        username,
        email: result[0]["email"],
        password: result[0]["password"],
        role: result[0]["role"]
      };

      this.initRoles();

      return privUser;
    } else {
      return false;
    }
  }

  async initRoles() {
    this._roles = [];

    //$sql = "SELECT t1.role_id, t2.role_name FROM user_role as t1 JOIN roles as t2 ON t1.role_id = t2.role_id WHERE t1.user_id = :user_id";

    //$sql2 = connection.raw('SELECT t1.role_id, t2.role_name FROM user_role as t1 JOIN roles as t2 ON t1.role_id = t2.role_id WHERE t1.user_id = :user_id');

    const role = await connection("roles")
      .select("role_id", "role_name")
      .join("users", "users.role", "=", "roles.role_id");
    
    role.map(async (row) => {
      return this._roles[row["role_name"]] = await Role.getRolePerms(row["role_id"]);
    });
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
