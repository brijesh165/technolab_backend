const authMiddleware = require('./../utils/middlewares/auth_middleware');
const formValidationMiddleware = require('./../utils/middlewares/form-validation-middleware');
const { check } = require('express-validator');

const userController = require('./../controllers/user_controller');

module.exports = function (app) {

    // End point for login request
    app.post("/login", [
        check("username").not().isEmpty().withMessage("User name is required!"),
        check("password").not().isEmpty().withMessage("Password is required!")
    ], formValidationMiddleware,userController.login);

    // End point for save results
    app.post("/saveresult", authMiddleware, [
        check("user_answers").not().isEmpty().isIn(["question_id", "user_answer"]).withMessage("User Answers are required or provide question_id/user_answer")
    ], formValidationMiddleware, userController.saveanswer);

    // End point for send email
    app.post("/sendemail", authMiddleware, userController.sendEmail);
}
