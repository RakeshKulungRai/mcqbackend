const QuestionController = require("./question.controller");
const question_controller = new QuestionController();
const { Router } = require("express");
const router = Router();
router.get("", question_controller.getAll);
router.post("", question_controller.create);
router.post("/:id/create-option", question_controller.createOption);
router.post("/:id/create-answer", question_controller.createAnswer);
router.delete("/:id", question_controller.delete);
router.delete("/option/:id",question_controller.deleteoption)
//router.put("/:id", question_controller.update);
router.get("/:id", question_controller.getDetailById);
router.put('/:id',question_controller.update)
router.put('/:id/update-option',question_controller.updateoption)
router.put('/:id/update-answer',question_controller.updateanswer)
module.exports = router;
