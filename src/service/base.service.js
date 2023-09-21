const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = class BaseService {
    db;
    constructor(model_name) {
        this.db = prisma[model_name];
    }
    async create(data) {
        return await this.db.create({
            data,
        });
    }

    async list() {
        console.log("list");
        return await this.db.findMany({});
    }
    async getDetailById(id) {
        return await this.db.findUnique({
            where: {
                id,
            },
        });
    }
    async delete(id) {
        return await this.db.delete({
            where: {
                id,
            },
        });
    }
    async update(id, data) {
        return await this.db.update({
            where: {
                id,
            },
            data,
        });
    }
};
