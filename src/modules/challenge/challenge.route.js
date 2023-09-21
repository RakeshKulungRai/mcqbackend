const { Router } = require("express");
const controller = require("./challenge.controller");

const router = new Router();
router.get("", controller.list);
router.post("", controller.create);
router.get("/:id", controller.detailById);
router.delete("/:id", controller.deleteById);
router.put("/:id", controller.updateById);
router.post("/:id/assign-question", controller.assignQuestion);
router.delete("/:id/assign-question/:question_id", controller.deleteQuestion);

module.exports = router;
