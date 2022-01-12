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
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "../", "database", "seeds"),
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
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
  },
};
