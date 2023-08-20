const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HashingUtils = require("../../utils/hashing.utils");

module.exports = class AuthService {
    static async getByEmail(email) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    static async saveUser(data) {
        const newData = { ...data };
        newData["password"] = await HashingUtils.hash(data.password);

        return await prisma.user.create({
            data: {
                ...newData,
            },
        });
    }
};
