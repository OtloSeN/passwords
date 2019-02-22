const express = require('express');

module.exports = (app) => {
    app.use(express.json());
    app.use('/users', require('../routes/users'));
    app.use('/auth', require('../routes/auth'));
    app.use('/services', require('../routes/services'));
}