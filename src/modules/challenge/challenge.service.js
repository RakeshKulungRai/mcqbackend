const BaseService = require("../../service/base.service");
const challenge_question_db = new BaseService("challengeQuestion");
module.exports = class ChallengeService extends BaseService {
    async assignQuestion({ challenge_id, question_id }) {
        const challenge_question = await challenge_question_db.create({
            challenge_id,
            question_id,
        });
        return challenge_question;
    }

    async challengeWithQuestions(challenge_id) {
        const result = await this.db.findUnique({
            where: {
                id: challenge_id,
            },
            include: {
                questions: {
                    include: {
                        answer: true,
                    },
                },
            },
        });
        return result;
    }
    async deleteChallengeQuestion(challenge_question_id) {
        console.log(challenge_question_id);
        return await challenge_question_db.delete(challenge_question_id);
    }
};
