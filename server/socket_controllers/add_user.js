const users = require("../users");

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const exist = users.find((user) => user.room === room && user.name === name);
  if (exist) return { error: "Username is taken!!!" };

  const user = { id, name, room };
  users.push(user);
  // console.log("New User: ", user);
  return { user };
};

module.exports = addUser;
