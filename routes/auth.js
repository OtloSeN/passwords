const router = require('express').Router();

const authController = require('./controllers/auth.controller');

router.post('/', authController.auth);

module.exports = router;