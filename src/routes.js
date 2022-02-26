const express = require("express");
require("express-group-routes");

const routes = express.Router();

// Helpers
const { permission } = require("./helpers/utils.helper");

// Controllers
const WebController = require("./app/controllers/WebController");
const AuthController = require("./app/controllers/AuthController");
const FakerController = require("./app/controllers/FakerController");

// Middlewares
const { session } = require("./app/middlewares/Authentication");

// Main
routes.get("/", WebController.renderHome);
routes.get("/register", WebController.renderRegister);
//routes.get('*', WebController.renderPageNotFound);

// Auth
routes.post("/login", AuthController.userLogin);
routes.post("/register", AuthController.userRegister);

// Authenticated
routes.group((router) => {
  router.use(session);

  router.get("/admin", permission(["login_admin"]), WebController.renderAdmin);
  router.get("/logout", AuthController.userLogout);
});

// API
routes.get("/api/id", FakerController.generateUID);

module.exports = routes;
