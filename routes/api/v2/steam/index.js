const router = require("express").Router();

router.use(require("./getfriendlist"));
router.use(require("./getplayerachievements"));
router.use(require("./getuserstatsforgame"));
router.use(require("./getplayersummaries"));
router.use(require("./getrecentlyplayedgames"));
router.use(require("./getcommunityprofile"));
router.use(require("./getsteamid"));
router.use(require("./getplayerbans"));

module.exports = router;
