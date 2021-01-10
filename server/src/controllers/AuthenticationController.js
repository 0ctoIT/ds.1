const {User} = require('../models');
const config = require('../config/config');

const jwt = require('jsonwebtoken');

/**
 * sign the user.
 * @param {json} user the user
 * @return {function} jwt.sign
 */
function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK,
  });
}

// want to create a new user record when the end point is hit
// or allow login of existing user
module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      const userJSON = user.toJSON();
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON),
      });
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.',
      });
    }
  },
  async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect.',
        });
      }

      const userJSON = user.toJSON();
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON),
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured during login.',
      });
    }
  },
};