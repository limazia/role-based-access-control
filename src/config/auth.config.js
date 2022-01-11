const { env } = require("./../helpers/utils.helper");

module.exports = {
  secret: env("APP_KEY"),
  expiresIn: '7d',
};