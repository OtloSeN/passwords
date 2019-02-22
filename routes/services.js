const router = require('express').Router();

const servicesController = require('./controllers/services.controller');
const auth = require('../middleware/auth');

router.get('/', auth, servicesController.getServices);

router.post('/', auth, servicesController.createService);

router.put('/:id', auth, servicesController.editService);

router.delete('/:id', auth, servicesController.deleteService);

module.exports = router;