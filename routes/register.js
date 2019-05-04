const userController = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const saltRounds = 12;


exports.form = (req, res) => {
  req.session.failed = false;
  res.render("register", {
    failed: req.session.failed,
    errors: req.session.errors
  });
  req.session.errors = null;
};
exports.submit = (req, res, next) => {
  req.session.failed = false;
  req.session.errors = [];
  req.check("email", "Invalid email addres").isEmail();
  req.check("password", "The password is too shortd").isLength({ min: 5 });
  req
    .check("password", "Password do not match")
    .equals(req.body.confirmPassword);

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.failed = true;
    res.redirect("back");
  } else {
    req.session.failed = false;

    userController.findOne(req.body.email, item => {
      if (item) {
        req.session.errors.push({
          param: "db",
          msg: "A user with this email already exists.",
          value: item.email
        });
        req.session.failed = true;
        res.redirect("back");
      } else {
        
        let salt = bcrypt.genSaltSync(saltRounds);
        
        const user = {
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          salt: salt

        };
        userController.create(user, item => {
          if (item) {
            req.session.failed = false;
            res.redirect("/");
          } else {
            req.session.errors = [
              req.session.errors,
              {
                param: "db",
                msg: "An error occurred on the server try again",
                value: "fail"
              }
            ];
            req.session.failed = true;
            res.redirect("back");
          }
        });
      }
    });
  }
};
