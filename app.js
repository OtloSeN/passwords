const express = require('express');
const config = require('config');

const app = express();

// startup requires
require('./startup/db')();
require('./startup/routes')(app);

const hostConfig = config.get('hostConfig');
app.listen(hostConfig.port, hostConfig.hostname, () => console.log(`Listening on port 3000...`));