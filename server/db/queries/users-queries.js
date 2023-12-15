const database = require("../connection");

const getUsers = () => {
  return database.query("SELECT * FROM users;").then((users) => {
    return users.rows;
  });
};

const getUserById = (id) => {
  return database
    .query("SELECT * FROM users WHERE id = $1", [id])
    .then((response) => {
      return response.rows[0];
    });
};

const getUserByEmail = (email) => {
  return database
    .query("SELECT * FROM users WHERE email = $1", [email])
    .then((response) => {
      return response.rows[0];
    });
};

const addUser = (email, password, name) => {
  return database
    .query(
      "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *;",
      [email, password, name]
    )
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = { getUsers, getUserById, getUserByEmail, addUser };
