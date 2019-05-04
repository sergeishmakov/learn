const models = require("../models");
const bcrypt = require("bcryptjs");


class userController {
static all(cb) {
  models.users.findAll({ order: ["createdAt"] }).then(items => {
    cb(items);
  });
}
static create(data, cb) {
  models.users.create(data).then(item => {
    cb(item);
  });
}
static findById(id, cb) {
  models.users.findOne({ where: { id: id } }).then(item => {
    if(item) {
      cb(null, item.dataValues)
    } else {
      cb(null, false);
    }
    
  });
}
static findOne(email, cb) {
  models.users.findOne({ where: { email: email } }).then(item => {
    if (item) {
      cb(item.dataValues);
    } else {
      cb(false);
    }
  });
}
static update(data, cb) {
  models.users.update(data, { where: { id: data.id } }).then(() => {
    cb("ok");
  });
}
static delete(id, cb) {
  models.users.destroy({ where: { id: id } }).then(item => {
    cb(id);
  });
}
static validPassword(password, user) {
  if (bcrypt.hashSync(password, user.salt) === user.password) {
    return true;
  } else {
    return false;
  }
}

}
module.exports = userController;
