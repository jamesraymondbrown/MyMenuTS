const database = require("../connection");

const getMenus = () => {
  return database.query("SELECT * FROM menus;").then((menus) => {
    return menus.rows;
  });
};

const getMenuById = (id) => {
  return database
    .query("SELECT * FROM menus WHERE id = $1", [id])
    .then((response) => {
      return response.rows[0];
    });
};

const addMenu = (user, name, description) => {
  return database
    .query(
      `INSERT INTO menus
          (user_id, name, description)
                          VALUES
          ($1, $2, $3) RETURNING *`,
      [user, name, description]
    )
    .then((response) => {
      return response.rows[0];
    });
};

const deleteMenu = (id) => {
  return database
    .query("DELETE FROM menus WHERE id = $1 RETURNING *", [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getMenus,
  getMenuById,
  addMenu,
  deleteMenu,
};
