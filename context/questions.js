let mongoose = require('mongoose');

let Questions = new mongoose.Schema({
    question_title: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correct_answer: {
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

module.exports = mongoose.model("Questions", Questions);