const express = require("express");

const routes = express.Router();

// Controllers
const WebController = require("./app/controllers/WebController");
const AuthController = require("./app/controllers/AuthController");
const FakerController = require("./app/controllers/FakerController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication");

// Main
routes.get('/', WebController.renderLanding);
//routes.get('*', WebController.renderPageNotFound);

// Auth
routes.get('/login', AuthController.userLogin);
routes.get('/register', AuthController.userRegister);
routes.get('/logout', AuthController.userLogout);

// Authenticated
routes.get('/home', Authentication.session, WebController.renderHome);
routes.get('/settings', Authentication.session, WebController.renderSettings);

// API
routes.get('/api/id', FakerController.generateUID);

module.exports = routes;