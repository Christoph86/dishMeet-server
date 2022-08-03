const router = require("express").Router();
const authRoutes = require("./auth.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("I am the Home Path '/'");
});

router.use("/auth", authRoutes);

module.exports = router;
