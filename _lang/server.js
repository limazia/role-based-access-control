require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const i18n = require("i18n-express");

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
    secret: "ASDSAJHDGASJDHASDABSDHJASGDAJHD",
    name: "DISCORD_OAUTH2_SESSION_ID",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000 * 24,
    },
  })
);
app.use(i18n({
  siteLangs: ["en-US", "pt-BR"],
  defaultLang: "pt-BR",
  paramLangName: "lang",
  translationsPath: path.join(__dirname, "/resources/locales"),
  textsVarName: 'translation'
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(routes);
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;

  handleError(status, err, res);
});

app.locals = locals;

app.listen(port, () => {
  console.log(`Server running in ${process.env.APP_URL}:${process.env.APP_PORT}`);
});
