const express = require("express");
const router = express.Router();

const menuQueries = require("../db/queries/menus-queries");

router.get("/", (req, res) => {
  menuQueries
    .getMenus()
    .then((menus) => {
      res.json(menus);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  menuQueries
    .getMenuById(req.params.id)
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const description = req.body.description;

  menuQueries
    .addMenu(user, name, description)
    .then((response) => {
      console.log("Menu Added:", response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  menuQueries
    .deleteMenu(id)
    .then((response) => {
      console.log("Menu Deleted:", response);
      res.send(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
