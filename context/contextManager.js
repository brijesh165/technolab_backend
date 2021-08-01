const userModel = require('./users');
const questionModel = require('./questions');
const resultModel = require('./results');

const _manager = {
    userModel: userModel,
    questionModel: questionModel,
    resultModel: resultModel
}

module.exports = _manager;