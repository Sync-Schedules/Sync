const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

let recipient ='';

router.post('/registration', function (req, res, next) {

    let recipient = req.body.user.email;
    let subjectTime = new Date();

    let n = new Date();
    let y = n.getFullYear();
    let m = n.getMonth();
    let d = n.getDate();

    let htmlBody =
        '<hr>'
        + '<div class="reg-box" style="max-width: 900px;margin: auto;padding: 30px;border:1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,.15)' +
        ';font-size: 16px;line-height: 24px;font-family: Roboto,sans-serif;">' +
        '<div fxLayout="column">' +
        '<h1>Hello, </h1>' + req.body.user.name + ' ' + req.body.user.last +
        '<h1>Your manager has created an account for you!</h1>' +
        '<h2>Here is your information: </h2>'+
        '<table>' +
        '<tr>' +
        '<td> Username: </td>' +
        '<td>' + req.body.user.username + '</td>'+
        '</tr>'+
        '<tr>' +
        '<td> Password: </td>' +
        '<td>' + req.body.user.password + '</td>'+
        '</tr>'+
        '</table>'+
        '<h2>Click here to log in and change your password</h2>' +
        '<a href="http://localhost:4200/resetPassword" style="padding: 16px;background-color: white;color: #0BA5DB; border: 2px solid #0BA5DB;text-decoration: none;">Change Password</a>' +
        '</div>' +
        '</div>'
    ;


    sendMail();

   function sendMail() {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: 'syncscheduleteam@gmail.com',
                pass: '12345!@#$%'
            }
        });

        let mailOptions = {
            from: '"Sync Schedules" <syncscheduleteam@gmail.com>',
            to: recipient,
            cc: 'syncscheduleteam@gmail.com',
            subject: 'Account Created',
            html: htmlBody
        };

        transporter.sendMail(mailOptions, function (err,info) {
            if(err){
                return console.log(err);
            }
            console.log('Message sent to: ' + info.response);
            console.log('email sent to: ' + mailOptions.to + '...' + new Date());
        });
    }

});

module.exports = router;
