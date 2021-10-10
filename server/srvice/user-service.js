const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

const UserModel = require('../models/user-model');

const mailService = require('./mail-service');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`Пользователь с таким email ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
  }
}

module.exports = new UserService();
