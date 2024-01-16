const express = require("express");
const router = express.Router();

const menuItemsQueries = require("../db/queries/menu-items-queries");

router.get("/:id", (req, res) => {
  const id = req.params.id;

  menuItemsQueries
    .getMenuItems(id)
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const menuId = req.body.menuId;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  menuItemsQueries
    .addMenuItem(menuId, name, description, price)
    .then((response) => {
      console.log("Menu Item Added:", response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.put("/:id", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;

  menuItemsQueries
    .updateMenuItem(name, description, price, id)
    .then((response) => {
      console.log("Menu Item Updated:", response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  menuItemsQueries
    .deleteMenuItem(id)
    .then((response) => {
      console.log(`Menu Item ${id} Deleted`);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
