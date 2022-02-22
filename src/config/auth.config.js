const { env } = require("./../helpers/utils.helper");

module.exports = {
  sessionAuth: {
    secret: env("APP_KEY"),
    name: "BLAB_SESSION_ID",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //3600000 * 24
      httpOnly: true,
      secure: env("NODE_ENV", "development") === "production" ? true : false,
    },
  },
};

1000 * 60 * 60 * 24;
