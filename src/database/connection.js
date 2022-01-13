const knex = require("knex");
const configuration = require("../config/database.config");
const { env } = require("../helpers/utils.helper");

const connection = knex(configuration[env("APP_ENV", "development")]);

module.exports = connection;
