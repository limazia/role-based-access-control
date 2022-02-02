const connection = require("../../database/connection");
const { isset } = require("../../helpers/utils.helper");

class Role {
  _permissions = [];

  async getRolePerms(role_id) {
    let role = new Role();

    //const roles = await connection.raw(`SELECT t2.permission_description FROM roles as t1
    //JOIN roles_permissions as t2 ON t1.role_permission = t2.permission_id
    //WHERE t1.role_id = :role_id`, { role_id });

    const roles = await connection.raw(`SELECT * FROM roles WHERE role_id = :role_id`, { role_id });

    roles.map((row) => {
      return role._permissions[row["role_name"]] = true;
    });

    return console.log(role);
  }

  hasPerm(permission) {
    return isset(() => this._permissions[permission]);
  }
}

module.exports = new Role();
