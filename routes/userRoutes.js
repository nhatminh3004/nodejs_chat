const { login } = require("../controller/userController");
const router = require("express").Router();
router.get("/test", (req, res) => {
  res.send("Hello");
});
router.post("login", login);
module.exports = router;
