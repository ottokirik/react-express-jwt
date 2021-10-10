const userService = require('../srvice/user-service');

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.cookie('refreshToke', userData.refreshToken), { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true };

      return res.json(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }

  async activate(req, res, next) {
    try {
    } catch (error) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (error) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json({ message: 'Робит' });
    } catch (error) {}
  }
}

module.exports = new UserController();
