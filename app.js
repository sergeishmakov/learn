const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressSession = require("express-session");
const expressValidator = require("express-validator")
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");

const registerRouter = require("./routes/register");
const usersRouter = require("./routes/users");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("trust proxy", 1);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  name: "session",
  secret: "sergey",
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.get('/', indexRouter);
app.get('/users', usersRouter.form);
app.get('/register', registerRouter.form);
app.post("/register", registerRouter.submit);
app.get('/login', loginRouter.form);
app.post('/login', loginRouter.submit);



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
