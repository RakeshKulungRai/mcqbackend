const HashingUtils = require("../../utils/hashing.utils");
const JwtTokenUtils = require("../../utils/jwtToken.utils");
const AuthService = require("./auth.service");

module.exports = class AuthController {
    static async loggedUserDetail(req, res) {
        const user = req.user;

        if (!user) return res.status(403).send("Not logged in");
        const result = await AuthService.getByEmail(user?.email);
        delete result["password"];
        return res.status(200).send(result);
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await AuthService.getByEmail(email);
            if (!user)
                return res.status(403).send({
                    email: "this email does not exist!!",
                });
            const isMatched = await HashingUtils.compare(
                password,
                user?.password
            );
            if (!isMatched)
                return res.status(403).send({
                    password: "password is does not match !!",
                });
            const save_user_info = {
                name: user.name,
                email: user.email,
                id: user?.id,
            };

            const access_token = await JwtTokenUtils.generateAccessToken(
                save_user_info
            );
            const refresh_token = await JwtTokenUtils.generateRefreshToken(
                save_user_info
            );

            res.status(200).send({
                user: save_user_info,
                access_token,
                refresh_token,
            });
        } catch (error) {
            console.log({ error });
            res.status(500).send("Error");
        }
    }

    static async register(req, res) {
        const { email, name, password } = req?.body || {};
        if (!email) throw Error("Email is required");
        try {
            const result = await AuthService.saveUser({
                email,
                name,
                password,
            });

            return res.status(201).send(result);
        } catch (err) {
            console.log({ err });
            return res.status(500).send("Error");
        }
    }

    static async handleRefreshToken(req, res) {
        const { token } = req.body;
        try {
            const result = await JwtTokenUtils.verifyRefreshToken(token);
            return res.status(200).send(result);
        } catch (err) {
            return res
                .status(403)
                .send({ message: "Error verifying refresh token" });
        }
    }
};
