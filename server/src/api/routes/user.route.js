const express = require('express')

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return res.status(200).json(req.user);
        }
        return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        next(error)
    }
});

module.exports = router