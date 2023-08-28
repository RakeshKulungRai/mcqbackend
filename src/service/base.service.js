const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = class BaseService {
    db;
    constructor(model_name) {
        this.db = prisma[model_name];
        console.log(this.db);
    }
    async post(data) {
        return await this.db.create({
            data,
        });
    }

    async list() {
        console.log(this);
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
