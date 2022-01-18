const { AppConfig } = require("../config");

const getPhoto = (row) => {
  return row !== null ? `${AppConfig.locals.CDN_URL}/${row}` : AppConfig.locals.ROOM_PHOTO_DEFAULT;
}

module.exports = {
  getPhoto,
};