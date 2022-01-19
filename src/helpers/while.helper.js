const moment = require("moment");

const connection = require("../database/connection");
const { getPhoto } = require("../helpers/chat.helper");

moment.locale("pt-br");

const getAllRooms = async (row, orderBy) => {
  const rooms = await connection("rooms").orderBy(row, orderBy || "desc");
  //.leftJoin("users_balance", "users_balance.balance_user", "=", "users.id")

  const serializedRooms = rooms.map((item) => {
    const {
      room_id,
      room_title,
      room_name,
      room_photo,
      updateAt,
      createdAt,
    } = item;

    return {
      room_id,
      room_title,
      room_name,
      room_photo: getPhoto(room_photo),
      updateAt: moment(updateAt).format("LL"),
      createdAt: moment(createdAt).format("LL"),
    };
  });

  return serializedRooms;
};

module.exports = {
  getAllRooms,
};
