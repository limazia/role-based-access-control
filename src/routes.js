const express = require("express");

const routes = express.Router();

// Controllers
const WebController = require("./app/controllers/WebController");
const AuthController = require("./app/controllers/AuthController");
const FakerController = require("./app/controllers/FakerController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication");

// Main
routes.get('/', WebController.renderHome);
routes.get('/login', WebController.renderLogin);
routes.get('/register', WebController.renderRegister);
//routes.get('*', WebController.renderPageNotFound);

// Auth
routes.post('/login', AuthController.userLogin);
routes.post('/register', AuthController.userRegister);

// Authenticated
routes.get('/room/:room_name', Authentication.session, WebController.renderRoom);
routes.get('/room', Authentication.session, WebController.renderPageNotFound);
routes.get('/logout', Authentication.session, AuthController.userLogout);

// API
routes.get('/api/id', FakerController.generateUID);

module.exports = routes;