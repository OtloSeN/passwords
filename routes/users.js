const router = require('express').Router();

const auth = require('../middleware/auth');
const usersController = require('./controllers/users.controller');

router.post('/', usersController.register);

router.get('/me', auth, usersController.getMe);

module.exports = router;