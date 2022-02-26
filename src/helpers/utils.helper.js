require("dotenv").config();
const { constantError } = require("../app/constants/error");

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} not set.`);
  }

  return value;
};

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

module.exports = {
  env,
  permission
};
