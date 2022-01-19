//Array of users
const users = [];

const addUser = (socketId, userName, roomName) => {
  const user = {
    socketID: socketId,
    username: userName,
    roomname: roomName,
  };

  users.push(user);

  return user;
};

const removeUser = (id) => {
  const getID = (users) => users.socketID === id;
  const index = users.findIndex(getID);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
