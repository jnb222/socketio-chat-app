const users = require("../users");

const getUser = ({ id }) => {
  return users.find((user) => user.id === id);
};

module.exports = getUser;
