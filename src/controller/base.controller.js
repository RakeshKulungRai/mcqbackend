module.exports = class BaseController {
    async getAll(req, res) {
        const result = await this.service.get();
        return res.status(200).send(result);
    }
    async post(req, res) {
        const data = req.body;
        const result = await this.service.post(data);
        return res.status(201).send(result);
    }

    async delete(req, res) {
        const { id } = req.params || {};
        const result = await this.service.delete(id);
        return res.status(204).send();
    }

    async update(req, res) {
        const { id } = req.params || {};
        const data = req.body;
        const result = await this.service.update(id, data);
        return res.status(200).send(result);
    }

    async getDetailById(req, res) {
        const { id } = req.params || {};
        const result = await this.service.getDetailById(id);
        return res.status(200).send(result);
    }
};
