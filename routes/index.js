const express = require("express");
const router = express.Router();
const articleControllers = require("../controllers/articleControllers");
const userControllers = require("../controllers/userControllers");

router.route("/").get(articleControllers.home);
router.route("/signUp").get(userControllers.signUp)
.post(userControllers.createNewUser);
router.route("/signIn")
.get(userControllers.signIn)
.post(userControllers.logIn)
router.route("/logOut")
.get(userControllers.logOut)
router.route("/profile").get(articleControllers.profile);
router
  .route("/listItems")
  .get(articleControllers.listItems)
  .post(articleControllers.createArticle);
router.route("/deleteArticle/:_id").get(articleControllers.deleteArticle);
router.route("/editArticle/:_id").get(articleControllers.editArticle);

module.exports = router;
