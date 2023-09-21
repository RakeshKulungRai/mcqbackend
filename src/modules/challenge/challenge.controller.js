const ChallengeService = require("./challenge.service");
const service = new ChallengeService("challenge");
module.exports = class ChallengeController {
    static async list(req, res) {
        const result = await service.list();
        return res.status(200).send(result);
    }
    static async create(req, res) {
        const data = req.body;
        const user = req.user;
        const result = await service.create({
            ...data,
            user_id: user?.id,
        });
        return res.status(201).send(result);
    }

    static async assignQuestion(req, res) {
        const { question_id } = req?.body || {};
        const { id: challenge_id } = req.params || {};
        console.log(challenge_id, question_id);
        const result = await service.assignQuestion({
            challenge_id: Number(challenge_id),
            question_id,
        });
        return res.status(201).send(result);
    }

    static async deleteQuestion(req, res) {
        const { question_id } = req.params || {};
        console.log(question_id);
        const result = await service.deleteChallengeQuestion(
            Number(question_id)
        );
        return res.status(204).send(result);
    }
    static async updateById(req, res) {
        const params = req.params;
        const result = await service.update(Number(params.id), req.body);
        return res.status(200).send(result);
    }
    static async deleteById(req, res) {
        const params = req.params;
        const result = await service.delete(Number());
        return res.status(204).send(result);
    }
    static async detailById(req, res) {
        const params = req.params;

        const result = await service.challengeWithQuestions(Number(params.id));
        return res.status(200).send(result);
    }
};
