const { env } = require("./../helpers/core.helper");

module.exports = {
  name: env("APP_NAME", "NodeJs App"),
  port: env("APP_PORT", 3333),
};
