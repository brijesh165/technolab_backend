let mongoose = require('mongoose');

let Users = new mongoose.Schema({
    first_name: {
        type: String,
        requried: true
    },
    last_name: {
        type: String,
        requried: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
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

module.exports = mongoose.model("Users", Users);