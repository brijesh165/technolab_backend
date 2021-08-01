const authMiddleware = require('./../utils/middlewares/auth_middleware');
const formValidationMiddleware = require('./../utils/middlewares/form-validation-middleware');
const { check } = require('express-validator');

const questionController = require('./../controllers/question_controller');

module.exports = function (app) {

    // End point to get all questions
    app.get("/listquestions", authMiddleware, questionController.listallquestions);

    // End point to add question
    app.post("/addquestion", authMiddleware, [
        check("question_title").not().isEmpty().withMessage("Question title is required!"),
        check("options").not().isEmpty().withMessage("Options are required!"),
        check("correct_answer").not().isEmpty().isIn(["a", "b", "c", "d", "A", "B", "C", "D"]).withMessage("Correct Answer is required or must be from a to d(upper/lower case)")
    ], formValidationMiddleware, questionController.addquestion);

    // End point to edit question
    app.post("/editquestion", authMiddleware, [
        check("question_id").not().isEmpty().withMessage("Question id is required!"),
        check("question_title").not().isEmpty().withMessage("Question title is required!"),
        check("options").not().isEmpty().withMessage("Options are required!"),
        check("correct_answer").not().isEmpty().isIn(["a", "b", "c", "d", "A", "B", "C", "D"]).withMessage("Correct Answer is required or must be from a to d(upper/lower case)")
    ], formValidationMiddleware, questionController.editquestion);

    // End point to delete question
    app.post("/deletequestion", authMiddleware, [
        check("question_id").not().isEmpty().withMessage("Question id is required!"),
    ], formValidationMiddleware, questionController.deletequestion);   
}