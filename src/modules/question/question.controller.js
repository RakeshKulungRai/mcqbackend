const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = class QuestionController {
    async getDetailById(req,res)
    {
        const {id} = req.params;
        const result = await prisma.question.findUnique(
            {
                where:
                {
                    id:Number(id)
                },
                include:
                {
                    options:true,
                    answer:true
                }
            }
        );
        res.status(200).send(result);

    }
    async getAll(req, res) {
        const result = await prisma.question.findMany({
            include: {
                options: true,
                answer: true,
            },
        });
        res.status(200).send(result);
    }
    async create(req, res) {
        const result = await prisma.question.create({
            data: {
                question: req.body.question,
                score: req.body.score,
            },
        });
        res.status(201).send(result);
    }

    async createOption(req, res) {
        const { id: question_id } = req.params;
        const { option } = req.body || {};

        const result = await prisma.option.create({
            data: {
                option,
                question_id: Number(question_id),
            },
        });
        res.status(201).send(result);
    }

    async createAnswer(req, res) {
        const { id: question_id } = req.params;
        const { option_id } = req.body;
        const result = await prisma.answer.create({
            data: {
                question_id: Number(question_id),
                option_id,
            },
        });
        res.status(201).send(result);
    }
};
