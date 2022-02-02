const { env } = require("./../helpers/utils.helper");

module.exports = {
  secretCookie: env("APP_KEY"),
  name: "BLAB_SESSION_ID",
  expiresIn: 3600000 * 24,
};