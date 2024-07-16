const { Router } = require('express');

const router = Router();

router.use("/portfolio", require("./portfolio"));
router.use("/order", require("./order.route"));
router.use("/user", require("./user.route"));
router.use("/auth", require("./auth.route"));

module.exports = router;