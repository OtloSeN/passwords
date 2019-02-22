const { User, validateUser } = require('../../models/user');

module.exports = {
    getMe,
    register
}

/**
 * Returns user information. E.g. user `s ID.
 **/
function getMe (req, res) {
    res.send(req.user._id);
}

async function register (req, res) {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send('Invalid input');

    let user = await User.findOne({ email: req.body.email });

    if(user) return res.status(400).send('User already exists');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save()

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(user);
}