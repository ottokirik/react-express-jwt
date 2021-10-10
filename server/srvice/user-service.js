const bcrypt = require('bcrypt');
const { v4 } = require('uuid');

const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');

const mailService = require('./mail-service');
const tokenService = require('./token-service');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw new Error(`Пользователь с таким email ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
