const { BEARER_TOKEN } = require('../../config');

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    const bearer = req.headers.authorization;
    if (bearer && bearer === `Bearer ${BEARER_TOKEN}`) {
        return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
}

module.exports = isAuthenticated;