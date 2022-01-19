require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const flash = require("connect-flash");

const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const routes = require("./routes");
const { env } = require("./helpers/utils.helper");
const { handleError } = require("./helpers/error.helper");
const { AppConfig, AuthConfig } = require("./config");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./helpers/user.helper");

app.set("view engine", "ejs");
app.set("views", [
  __dirname + "/resources/views",
  __dirname + "/resources/views/errors",
]);

if (env("APP_DEBUG", false) === true) app.use(morgan(':method :url :status :response-time ms'));
app.use(cookieParser());
app.use(
  session({
    secret: AuthConfig.secretCookie,
    name: AuthConfig.name,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: AuthConfig.expiresIn,
    },
  })
);
app.use(function(req, res, next){
  res.locals.user = req.session.user;

  const serializedUser = {
    id: "cd4244141da8325",
    username: "Lima",
    email: "limadeacacio@gmail.com",
    discriminator: "2406",
    avatar: "http://localhost:3000/cdn/avatar1.jpg",
    role_class: "badge-role dev",
    role_permissions: "edit_name, delete_room",
    updateAt: "2022-01-16 15:36:21",
    createdAt: "2022-01-13 22:12:35",
  };

  req.session.user = serializedUser;

  next();
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/cdn", express.static(path.resolve(__dirname, '../', "cdn")));
app.use(routes); 
app.use((err, req, res, next) => {
  handleError(err, res);
});

 

app.locals = AppConfig.locals;

server.listen(AppConfig.port, () => {
  console.log(`Server running in ${env("APP_URL", "http://localhost")}:${env("APP_PORT", 3333)}`);
});