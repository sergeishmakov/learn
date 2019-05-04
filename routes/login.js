const userController = require("../controllers/userController");
const passport = require("passport");

exports.form = (req, res) => {
  res.render("login", { errors: req.session.errors });
  req.session.errors = null;
};
exports.submit = (req, res, next) => {
  passport.authenticate("local", (err, user, messages) => {
    req.session.errors = [];
    if (messages){
    req.session.errors.push({
        param: "authenticate",
        msg: messages.message || null,
        value: user.email
      });
    }
    if (err) {
      return next(err);
    }
    if (!user) {
        
      return res.redirect("/login");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/users");
    });
  })(req, res, next);
};
