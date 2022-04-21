const router = require("express").Router();

router.use("/steam", require("./steam"));
// router.use('/steam', require('./faceit'))

module.exports = router;
