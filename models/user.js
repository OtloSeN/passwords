const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    services: [
        {
            name: {
                type: String,
                required: true,
                minlength: 3
            },
            login: {
                type: String,
                minlength: 3
            },
            password: {
                type: String,
                minlength: 3
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
})

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('users', userSchema);


/**
 * Validation functions
 */
function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }

    return Joi.validate(user, schema);
}

module.exports = {
    User,
    validateUser
}