const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../controllers/userController");


passport.serializeUser((user, done) => {
  console.log("Serialize", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Deserialize", id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    

    User.findOne(email, user => {
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!User.validPassword(password, user)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);
