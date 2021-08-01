const db = require('./../context/contextManager');
const md5 = require('md5');

const seederController = {};

seederController.init = async () => {
    seederController.createUser();
}

seederController.createUser = async () => {
    await db.userModel.create(
        {
            first_name: "abc",
            last_name: "def",
            username: "abcdef",
            password: md5('abc@123'),
            email: "abc@def.com",         
            role: "enduser"
        },
        {
            first_name: "abc",
            last_name: "xyz",
            username: "abcxyz",
            password: md5('abc@456'),
            email: "abc@xyz.com",         
            role: "enduser"
        }, 
        {
            first_name: "admin",
            last_name: "admin",
            username: "admin",
            password: md5('admin@123'),
            email: "admin@admin.com",
            role: "admin"
        })

    await db.questionModel.create(
        {
        question_title: "Which of the following is generally used for performing tasks like creating the structure of the relations, deleting relation?",
        options: ["DML", "Query", "Relational Schema", "DDL"],
        correct_answer: "DDL"
        },
        {
            question_title: "Which of the following provides the ability to query information from the database and insert tuples into, delete tuples from, and modify tuples in the database?",
            options: ["DML", "DDL", "Query", "Relational Schema"],
            correct_answer: "DML"
        }, 
        {
            question_title: "Which of the following can be considered as the maximum size that is supported by FAT?",
            options: ["8GB", "4GB", "4TB", "None of the above"],
            correct_answer: "4GB"
        }
    )
}

module.exports = seederController;