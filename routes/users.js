const userController = require("../controllers/userController");

exports.form = (req, res) => {
  userController.all(items => {
    res.render("users", {
      users: items
    });
  });
};
