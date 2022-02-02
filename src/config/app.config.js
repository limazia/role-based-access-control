const { env } = require("../helpers/utils.helper");

module.exports = {
  name: env("APP_NAME", "NodeJs App"),
  port: env("APP_PORT", 3333),
  locals: {
    PAGE_TITLE: env("APP_NAME", "NodeJs App"),

  }
};
