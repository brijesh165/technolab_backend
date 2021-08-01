const db = require('./../context/contextManager');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const nodemailer = require('nodemailer');

let _controller = {};

/**
 * 
 * @param {*} username 
 * @param {*} password
 * login handler
 */
_controller.login = async function (req, res) {
    try {
        console.log("Login Params: ", req.body);

        const user = await db.userModel.findOne({ username: req.body.username, password: md5(req.body.password) });

        if (user) {

            const token = jwt.sign({id: user._id}, "provideyourprivatekey");

            res.send({
                status: 200,
                token: token,
                user: user
            })
        } else {
            res.send({
                status: 401,
                error: "Invalid Username or Password. Please try again!"
            })
        }
    } catch (error) {
        console.error("User Controller || Login Error: ", error);
    }
}

/**
 * 
 * @param {*} user_answers 
 * save user's answers in database 
 */
_controller.saveanswer = async function (req, res) {
    try {
        const answers = req.body.user_answers;
        for (let i=0; i<answers.length;i++) {
            await db.resultModel.create({
                question_id: answers[i].question_id,
                user_answer: answers[i].user_answer,
                user_id: req.user.id
            })    
        }

        res.send({
            status: 200,
            message: "Result saved successful!"
        })
    } catch (error) {
        console.error("User Controller || Save Answer Error: ", error);
    }
}

/**
 * 
 * Send email 
 */
_controller.sendEmail = async function (req, res) {
    try {
        const user_info = await db.userModel.findOne({_id: req.user.id});

        if (!user_info) {
            res.send({
                status: 404,
                message: "Unauthorized access."
            })
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',
              pass: 'yourpassword'
            }
          });
          
          let mailOptions = {
            from: 'youremail@gmail.com',
            to: `${user_info.email}`,
            subject: '',
            text: `
                Hello, ${user_info.first_name},

                You have successfully submited your answers. We will review it and get back to you with the response.
                Please allow us 2-3 business days for processing.
                
                Thanks & reagards,
                Technolab`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.send({
                    status: 404,
                    message: "Something went wrong. Please try again!"
                })
            } else {
              console.log('Email sent: ' + info.response);
              res.send({
                  status: 200,
                  message: "Email sent successfully!"
              })
            }
          });

    } catch (error) {
        console.error("User Controller || Send Email Error: ", error);
    }
}

module.exports = _controller;