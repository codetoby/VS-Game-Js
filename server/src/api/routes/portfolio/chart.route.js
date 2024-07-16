const { Router } = require('express');
const { findUChartByUserId } = require('../../../services/chart.service');
const isAuthenticated = require('../../middlewares/isAuthenticated');

const router = Router()

router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.user;
        const chart = await findUChartByUserId(userId);
        return res.json(chart);
    } catch (error) {
        next(error);
    }
   
})

module.exports = router