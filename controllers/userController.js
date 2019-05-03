const models = require("../models");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

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
    models.users.findAll({ where: { id: id } }).then(item => {
      cb(null, item);
    });
  }
  static findOne(email, cb) {
    models.users.findOne({ where: { email: email } }).then(item => {
      cb(item);
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
  static hashedPassword(password){
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }
}
module.exports = userController;
