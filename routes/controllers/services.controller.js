const _ = require('lodash');
const { User } = require('../../models/user');
const Joi = require('joi');

module.exports = {
    getServices,
    createService,
    editService,
    deleteService
}

async function getServices(req, res) {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).send('User not found');

    res.send(_.pick(user, ['services']));
}

async function createService(req, res) {
   const { error } = validateService(req.body);
    if(error) return res.status(400).send('Invalid input');

    const service = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    }

    const user = await User.findByIdAndUpdate(
                    req.user._id,
                    { $push: { services: service } },
                    { new: true }
                );

    if(!user) return res.status(404).send('User not found');

    res.send(_.pick(user, ['services']));
}

async function editService(req, res) {
    const { error } = validateService(req.body);
    if(error) return res.status(400).send('Invalid input');

    const service = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    }

    const user = await User.findOneAndUpdate(
                    { 'services._id': { _id: req.params.id } },
                    { $set: { 'services.$': service } },
                    { new: true }
                );

    if (!user) return res.status(404).send('User not found');

    res.send(_.pick(user, ['services']));
}

async function deleteService(req, res) {
    const user = await User.findOneAndUpdate(
                    { 'services._id': { _id: req.params.id } },
                    { $pull: { services: { _id: req.params.id } } },
                    {new: true}
                );

    if (!user) return res.status(404).send('User not found');

    res.send(_.pick(user, ['services']));
}

function validateService(service) {
    const schema = {
        name: Joi.string().required().min(3),
        login: Joi.string().min(3),
        password: Joi.string().min(3)
    }

    return Joi.validate(service, schema);
}