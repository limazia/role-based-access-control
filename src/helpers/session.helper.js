const moment = require("moment");
const { constantError } = require("../app/constants/error");
const { getByEmail } = require("../app/class/PrivilegedUser");

moment.locale("pt-br");

const permission = (roles = []) => {
  return (request, response, next) => {
    const session = request.session.user;
    const userPermissions = session.permissions.split(",");

    if (typeof roles === "string") {
      roles = [roles];
    }

    try {
      if (roles.length && !userPermissions.some((permission) => roles.indexOf(permission) >= 0)) {
        return response.redirect("/");
      }

      return next();
    } catch (err) {
      return request.flash("error", constantError.MISSING_PERMISSIONS);
    }
  };
};

const updateSession = async (request, response, next) => {
    const session = request.session.user;
    const user = await getByEmail(session ? session.email : null);

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
 
 
};

module.exports = {
  permission,
  updateSession,
};
