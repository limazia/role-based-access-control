const { env } = require("../helpers/utils.helper");

module.exports = {
  name: env("APP_NAME", "NodeJs App"),
  port: env("APP_PORT", 3333),
  locals: {
    PAGE_TITLE: env("APP_NAME", "NodeJs App"),
    USER_PHOTO_DEFAULT: "/cdn/room_default.jpg",
    ROOM_PHOTO_DEFAULT: "/cdn/room_default.jpg",
    CDN_URL: `${env("APP_URL", "http://localhost")}:${env("APP_PORT", 3333)}/cdn`,
  }
};
