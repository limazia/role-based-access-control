const knex = require('knex');
const configuration = require('../config/database.config');

const connection = knex(configuration.development);

module.exports = connection;