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

app.set("view engine", "ejs");
app.set("views", [
  __dirname + "/resources/views",
  __dirname + "/resources/views/errors",
]);

<<<<<<< HEAD
=======
if (env("APP_ENV", "development") !== "development") {
  app.use("/cdn", express.static(path.resolve(__dirname, '../', "cdn")));
} else {
  app.use(subdomain('cdn', express.static(path.join(__dirname, "../cdn"))));
  app.use(express.static(path.join(__dirname, "../cdn"), {
    index: false,
    redirect: false
  }));
}
>>>>>>> 4714387bca2f27d68ae6c14e3b4700c5320a3b25
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

// Cria um array com as mensagens
let users = [];
let messages = [];

// Quando um client se conectar
io.on("connection", socket => {
    console.log(`Socket conectado: ${socket.id}`);

    // Envia uma mensagem ao socket
    socket.emit("previousMessages", messages);

    // Ao executar a função no Front-end, recebemos no Back-end pra tratar da maneira que quisermos
    socket.on("sendMessage", data => {
      // Envia a informação pro array messages
      messages.push(data);
      
      // Envia para todos os sockets
      socket.broadcast.emit("receivedMessage", data);
    });
  
    // client disconnected
    socket.on('disconnect', function() {
      console.log(`${socket.id} is disconnected.`);
    });
});

app.locals = AppConfig.locals;

server.listen(AppConfig.port, () => {
  console.log(`Server running in ${env("APP_URL", "http://localhost")}:${env("APP_PORT", 3333)}`);
});