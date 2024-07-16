const express = require('express')
const { buy, sell } = require("../../services/portfolio.service")
const isAuthenticated = require("../middlewares/isAuthenticated")
const router = express.Router()


router.post('/buy', isAuthenticated, async (req, res, next) => {
    try {
        const { userId, ticker, shares } = req.body
        const execute = await buy(userId, ticker, shares);
        console.log(execute)
        res.json(execute);
    } catch (error) {
        next(error);
    }
})

router.post('/sell', isAuthenticated, async (req, res, next) => {
    try {
        const { userId, ticker, shares } = req.body
        const execute = await sell(userId, ticker, shares);
        console.log(execute)
        res.json(execute);
    } catch (error) {
        next(error);
    }
})

module.exports = router