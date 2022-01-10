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
routes.get('/store', WebController.renderStore);
routes.get('/support', WebController.renderSupport);
routes.get('/commands', WebController.renderCommands);
routes.get('/profile/:username.:discriminator', WebController.renderProfile);
routes.get('/changelogs', WebController.renderChangelogs);
routes.get('/terms', WebController.renderTerms);
routes.get('/privacy-policy', WebController.renderPrivacyPolicy);
//routes.get('*', WebController.renderPageNotFound);

// Authenticated
routes.get('/guilds', Authentication.session, WebController.renderGuilds);
routes.get('/purchases', Authentication.session, WebController.renderPurchases);
routes.get('/settings', Authentication.session, WebController.renderSettings);

// Auth
routes.get('/authorize', AuthController.userAuthorize);
routes.get('/logout', AuthController.revokeUser);

// API
routes.get('/api/users/@me', AuthController.getUser);
routes.get('/api/users/@me/managed-guilds', AuthController.getUser);
routes.get('/api/id', FakerController.generateUID);
routes.get("/api/changelog", function (request, response, next) {
  response.clearCookie("changelog_view");

  return response.redirect("/");
})

module.exports = routes;