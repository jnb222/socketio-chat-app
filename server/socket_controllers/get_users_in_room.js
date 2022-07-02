const users = require("../users");

const getUsersInRoom = ({ room }) => {
  return users.filter((user) => user.room === room);
};

module.exports = getUsersInRoom;
