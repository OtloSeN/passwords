const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('dbConfig');

module.exports = () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(`mongodb://${dbConfig.host}/${dbConfig.dbName}`, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
        .then(() => console.log('Connected to DB...'))
        .catch(err => console.log(err));
}