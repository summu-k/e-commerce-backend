module.exports = (app: { use: (arg0: string, arg1: any) => void }) => {
  // const tutorials = require('../controllers/tutorial.controller.js');
  const users = require('../controllers/users.controller');

  var router = require('express').Router();

  // Create a new Tutorial
  router.post('/', users.create);

  router.post('/authenticate', users.findOne);

  router.post('/products', users.getAll);

  router.post('/register', users.create);

  router.post('/seed', users.seed);

  // // Retrieve all Tutorials
  // router.get('/', tutorials.findAll);

  // // Retrieve all published Tutorials
  // router.get('/published', tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get('/:id', tutorials.findOne);

  // // Update a Tutorial with id
  // router.put('/:id', tutorials.update);

  // // Delete a Tutorial with id
  // router.delete('/:id', tutorials.delete);

  // // Create a new Tutorial
  // router.delete('/', tutorials.deleteAll);

  app.use('/api/users', router);
};
