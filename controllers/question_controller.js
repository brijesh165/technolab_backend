const db = require("./../context/contextManager");

let _controller = {};

// send all the questions from the database
_controller.listallquestions = async function (res, res) {
    try {
        const allQuestions = await db.questionModel.find();

        res.send({
            status: 200,
            allQuestions: allQuestions 
        })
    } catch (error) {
        console.error("Question Controller || List all questions Error: ", error);
    }
}

/**
 * 
 * @param {*} question_title 
 * @param {*} options(array of string)
 * @param {*} correct_answer 
 * Add new question in the database
 */
_controller.addquestion = async function (req, res) {
    try {

        const addQuestion = await db.questionModel.create(req.body);

        res.send({
            status: 200,
            message: "Question Added Successfully!"
        })
    } catch (error) {
        console.error("Question Controller || Add question Error: ", error);
    }
}

/**
 * 
 * @param {*} question_id
 * @param {*} question_title 
 * @param {*} options(array of string)
 * @param {*} correct_answer 
 * Edit existing question in the database
 */
 _controller.editquestion = async function (req, res) {
     try {
        const editQuestion = await db.questionModel.findByIdAndUpdate(req.body.question_id,{
            question_title: req.body.question_title,
            options: req.body.options,
            correct_answer: req.body.correct_answer
        }, { new: true });

        res.send({
            status: 200,
            message: "Question Edited Successfully!"
        })
     } catch (error) {
        console.error("Question Controller || Edit question Error: ", error);
     }
}


/**
 * 
 * @param {*} question_id
 * delete existing question in the database
 */
 _controller.deletequestion = async function (req, res) {
    try {
        const deletequestion = await db.questionModel.findByIdAndDelete(req.body.question_id);

        if (!deletequestion) {
            res.send({
                status: 404,
                message: "Something went wrong. Please try again!"
            })
        } else {
            res.send({
                status: 200,
                message: "Question Deleted Successfully!"
            })
        }
    } catch (error) {
        console.error("Question Controller || Delete question Error: ", error);
    }
}


module.exports = _controller;
