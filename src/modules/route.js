const authRouter = require("./auth/auth.route");
const { Router } = require("express");
const router = Router();
router.use("/auth", authRouter);
module.exports = router;
