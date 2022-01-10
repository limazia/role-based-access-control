const definedPort = process.env.npm_config_port; 
const defaultPort = process.env.APP_PORT || 3333;
const port = definedPort ? definedPort : defaultPort;

module.exports = port;