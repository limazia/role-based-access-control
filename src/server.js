require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const flash = require('connect-flash');

const routes = require("./routes");
const port = require("./config/port");
const locals = require("./config/locals");
const { handleError } = require("./helpers/error.helper");

const app = express();

app.set("view engine", "ejs");
app.set("views", [
  __dirname + "/resources/views",
  __dirname + "/resources/views/errors",
]);

if (process.env.APP_DEBUG === true) app.use(morgan(':method :url :status :response-time ms'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    name: "DISCORD_OAUTH2_SESSION_ID",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24,
    },
  })
);

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  
  next();
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(path.join(__dirname, "/public")));
app.use(routes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.locals = locals;

app.listen(port, () => {
  console.log(`Server running in ${process.env.APP_URL}:${process.env.APP_PORT}`);
});