const { Router } = require('express')
const { formatData } = require("../../../services/webview.service")
const isAuthenticated = require("../../middlewares/isAuthenticated")
const router = Router()


router.get('/', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.user;
        const data = await formatData(userId);
        return res.json(data);
    } catch (error) {
        next(error)
    }
})

module.exports = router