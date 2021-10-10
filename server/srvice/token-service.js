const jwt = require('jsonwebtoken');

const tokenModel = require('../models/token-model');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userID, refreshToken) {
    // Один пользователь - один токен, вход возможен только с одного устройства
    const tokenData = await tokenModel.findOne({ user: userID });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await tokenModel.create({ user: userID, refreshToken });

    return token;
  }
}

module.exports = new TokenService();
