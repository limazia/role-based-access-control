const { AppConfig } = require("../config");

const getPhoto = (row) => {
  return row !== null ? `${AppConfig.locals.CDN_URL}/${row}` : AppConfig.locals.ROOM_PHOTO_DEFAULT;
}

const getAvatar = (row) => {
  return row !== null ? `${AppConfig.locals.CDN_URL}/${row}` : AppConfig.locals.USER_PHOTO_DEFAULT;
}

const getRole = (row) => {
  return null;
}

const getRolePermission = (permissions) => {
  if (permissions === null) return {};

  return permissions.split(', ');
}

module.exports = {
  getPhoto,
  getAvatar,
  getRole,
  getRolePermission,
};