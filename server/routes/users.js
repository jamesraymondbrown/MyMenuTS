const express = require("express");
const router = express.Router();

const userQueries = require("../db/queries/users-queries");

router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", (req, res) => {
  userQueries
    .getUserById(req.params.id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email cannot be blank" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password cannot be blank" });
  }
  userQueries.getUserByEmail(email).then((user) => {
    if (user) {
      return res.status(400).send({ message: "This user already exists" });
    }
    userQueries.addUser(email, password, name).then((user) => {
      return res.status(200).send({ message: "Welcome", user });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: "Email cannot be blank" });
  }
  if (!password) {
    return res.status(400).send({ message: "Password cannot be blank" });
  }
  userQueries.getUserByEmail(email).then((user) => {
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    if (user.password !== password) {
      return res.status(400).send({ message: "Invalid password" });
    }
    return res.status(200).send({ message: `Welcome back, ${user.name}` });
  });
});

module.exports = router;
