const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = class QuestionController {
    async delete(req,res)
    {
        const {id} = req.params
        const result = await prisma.question.delete({where:{id:Number(id)}})
        res.status(204).send();
    }
  async update(req,res)
  {
    const {id} = req.params;
    const {question,score}= req.body;
    const result = await prisma.question.update({
        where:{
            id:Number(id)
        },
        data:{
            question:question,
            score:Number(score)
        }
    })
    res.status(200).send(result);
  }
  async updateoption(req,res)
  {
    const {id} = req.params
      const result = await prisma.option.update({
        where:{id:Number(id)},
        data:req.body
    }
      )
      res.status(200).send(result);
  }
  async updateanswer(req,res)
  {
    const {id} = req.params
    const {question_id,option_id} = req.body
    const result = await prisma.answer.update({
        where:{id:Number(id)},
        data: {
            question_id: Number(question_id),
            option_id:Number(option_id)
        },
    })
    res.status(200).send(result)
  }
  async deleteoption(req,res)
  {
      const {id} = req.params
      const result = await prisma.option.delete({where:{id:Number(id)}})
      res.status(204).send();
  }
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
                score: parseFloat(req.body.score),
                options:{create:req.body.options || []}
            },
            include:
            {
                options:true
            }
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
                option_id:Number(option_id)
            },
        });
        res.status(201).send(result);
    }
};
