const { env } = require("./utils.helper");

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, response) => {
  const { statusCode, message } = err;
  const code = statusCode >= 100 && statusCode < 600 ? err.code : 500;

  if (env("APP_ENV", "development") === "development") {
    response.status(code).json({
      status: "error",
      statusCode: code,
      message,
    });
  } else { 
    return response.status(code).render("InternalServerError", {
      statusCode: code,
      message,
    });
  }
};

module.exports = {
  ErrorHandler,
  handleError,
};
