const AuthController = require('./controllers/AuthenticationController');
const SongsController = require('./controllers/SongsController');
const AuthConPolicy = require('./policies/AuthenticationControllerPolicy');
// controllers are used for declaring end points
// routes are for declaring routes that point to controllers
module.exports = (app) => {
  app.post('/register',
    AuthConPolicy.register,
    AuthController.register);
  app.post('/login',
    AuthController.login);

  app.get('/songs',
    SongsController.index);
  app.get('/songs/:songId',
    SongsController.show);
  app.post('/songs',
    SongsController.post);
  app.put('/songs/:songId',
    SongsController.put);
};
