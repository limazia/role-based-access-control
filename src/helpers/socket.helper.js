const users = [];
 
const addUser = (id, name, room) => {
  const user = { id, name, room };
  users.push(user);

  console.log(user)
  
  return { user };
};

const getUser = (id) => {
  let user = users.find((user) => user.id == id);
  return user;
};

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, getUser, deleteUser, getUsers };
