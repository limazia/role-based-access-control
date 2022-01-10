const cryptoRandomString = require("crypto-random-string");

class FakerController {
  async generateUID(request, response, next) {
    try {
      const uuid = cryptoRandomString({ length: 13 });

      return response.json({
        uuid
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FakerController();
