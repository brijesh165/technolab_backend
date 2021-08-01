let mongoose = require('mongoose');

let Result = new mongoose.Schema({
    question_id: {
        type: String,
        required: true
    },
    user_answer: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    },
    versionKey: false
})

module.exports = mongoose.model("Result", Result);