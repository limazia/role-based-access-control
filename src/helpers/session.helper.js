const moment = require("moment");
const { constantError } = require("../app/constants/error");
const { createSessionByEmail } = require("../app/class/PrivilegedUser");

moment.locale("pt-br");

const permission = (roles = []) => {
  return (request, response, next) => {
    const { permissions } = request.session.user;

    if (typeof roles === "string") {
      roles = [roles];
    }

    try {
      if (roles.length && !permissions.some((permission) => roles.indexOf(permission) >= 0)) {
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
    const user = await createSessionByEmail(session ? session.email : null);

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
