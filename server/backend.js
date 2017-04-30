const express = require('express');
var expressRestResource = require('express-rest-generator');
var Datastore = require('nedb');

module.exports = function createBackend(host, port) {
  const app = express();
  const userDatabase = new Datastore();

  userDatabase.insert({username: 'user', email: 'email', index: 0});
  app.use('/api/users', expressRestResource({db: userDatabase}));

  app.listen(port, () => {
    console.log('Backend server runs at http://' + host + ':' + port);
  });
}

