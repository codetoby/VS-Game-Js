const { Router } = require('express');

const router = Router();

router.use('/webview', require('./webview.route'));
router.use('/chart', require('./chart.route'));
router.use('/', require('./portfolio.route'));

module.exports = router