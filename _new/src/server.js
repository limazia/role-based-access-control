require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");
const { handleError } = require("./helpers/error.helper");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/resources/views"));
app.use(`/${process.env.STATIC_DIR}`, express.static(path.resolve(__dirname, '../', process.env.FOLDER_ROOT)));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(routes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.locals = {
  PAGE_TITLE: process.env.APP_NAME,
  PAGE_URL: `${process.env.APP_URL}:${process.env.APP_PORT}`,
};

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(`Server running in ${process.env.APP_URL}:${process.env.APP_PORT}`);
});