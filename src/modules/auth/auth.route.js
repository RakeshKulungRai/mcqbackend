const { Router } = require("express");
const AuthController = require("./auth.controller");
const { verifyUser } = require("../../middleware/auth.middleware");
const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh_token", AuthController.handleRefreshToken);
router.get("/me", verifyUser, AuthController.loggedUserDetail);
module.exports = router;
