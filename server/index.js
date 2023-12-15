const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./db/connection.js");

// Middleware
app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
const menusRouter = require("./routes/menus");
const menuItemsRouter = require("./routes/menu-items");

app.use("/users", usersRouter);
app.use("/menus", menusRouter);
app.use("/menu-items", menuItemsRouter);

app.listen(8000, () => {
  console.log("server has started on port 8000");
});
