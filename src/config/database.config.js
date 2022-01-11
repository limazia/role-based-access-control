const path = require("path");
const { env } = require("./../helpers/utils.helper");

module.exports = {
  development: {
    client: env("DB_CONNECTION"),
    connection: {
      host: env("DB_HOST"),
      port: env("DB_PORT", 3306),
      user: env("DB_USERNAME"),
      password: env("DB_PASSWORD"),
      database: env("DB_DATABASE"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
    },
  },

  production: {
    client: env("DB_CONNECTION"),
    connection: {
      host: env("DB_HOST"),
      port: env("DB_PORT", 3306),
      user: env("DB_USERNAME"),
      password: env("DB_PASSWORD"),
      database: env("DB_DATABASE"),
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
    },
  },
};
