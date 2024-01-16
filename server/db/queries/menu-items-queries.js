const database = require("../connection");

const getMenuItems = (menu_id) => {
  return database
    .query("SELECT * FROM menu_items WHERE menu_id = $1;", [menu_id])
    .then((menus) => {
      return menus.rows;
    });
};

const addMenuItem = (menu_id, name, description, price) => {
  return database
    .query(
      `INSERT INTO menu_items
          (menu_id, name, description, price)
                          VALUES
          ($1, $2, $3, $4) RETURNING *`,
      [menu_id, name, description, price]
    )
    .then((response) => {
      return response.rows[0];
    });
};

const updateMenuItem = (name, description, price, id) => {
  return database
    .query(
      `UPDATE menu_items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *`,
      [name, description, price, id]
    )
    .then((response) => {
      return response.rows[0];
    });
};

const deleteMenuItem = (id) => {
  return database
    .query("DELETE FROM menu_items WHERE id = $1 RETURNING *", [id])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
