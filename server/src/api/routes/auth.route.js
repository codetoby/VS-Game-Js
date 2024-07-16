const { Router } = require('express')
const passport = require('passport')
const { FRONTEND_URL } = require('../../config')

const router = Router()

router.get('/discord/login', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: `${FRONTEND_URL}/login`,
    successRedirect: `${FRONTEND_URL}/portfolio`
}));

module.exports = router