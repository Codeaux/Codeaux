'use strict';

module.exports = function(app) {
  // User Routing.
  var users = require('../controllers/users.server.controller');

  // Search for users matching a search string
  app.route('/api/users').get(users.search);

  // Setting up the Users Profile API.
  app.route('/api/:username').get(users.read);

  app.route('/api/users').put(users.update);
  app.route('/api/users/accounts').delete(users.removeOAuthProvider);
  app.route('/api/users/password').post(users.changePassword);
  app.route('/api/users/picture').post(users.changeProfilePicture);

  // Add friend into User schema
  app.route('/api/users/friends').post(users.addFriend);

  // Finish by binding the user middleware.
  app.param('username', users.userByUsername);
};
