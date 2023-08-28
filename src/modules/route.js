const authRouter = require("./auth/auth.route");
const questionRouter = require("./question/question.route");
const { Router } = require("express");
const router = Router();
router.use("/auth", authRouter);
router.use("/questions", questionRouter);
module.exports = router;
