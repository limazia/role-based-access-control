const { config: dotEnvConfig } = require("dotenv");
const path = require("path");

const root_path = (directory = undefined) =>
  path.resolve(__dirname, "../../..", directory || "");
const client_path = (directory) =>
  path.resolve(root_path(), "client", directory || "");
const server_path = (directory) =>
  path.resolve(root_path(), "server", directory || "");
const src_path = (directory) =>
  path.resolve(server_path(), "src", directory || "");
const app_path = (directory) =>
  path.resolve(server_path(), "src/app", directory || "");
dotEnvConfig({ path: root_path(".env") });

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} not set.`);
  }

  return value;
};

const normalizePort = (port) => {
  port = parseInt(port, 10);

  if (isNaN(port)) {
    throw new Error("Invalid port.");
  }

  if (port <= 0) {
    throw new Error("Invalid port.");
  }

  return port;
};

const onServerListening = () => {
  console.log(`Server running in ${process.env.APP_URL}:${process.env.APP_PORT}`);
};

const onServerError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

module.exports = {
  root_path,
  client_path,
  server_path,
  src_path,
  app_path,
  env,
  normalizePort,
  onServerListening,
  onServerError,
};