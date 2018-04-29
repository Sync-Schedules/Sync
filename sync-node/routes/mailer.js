const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    auth:{
        user:"",
        pass:""
    }
});

let rand, mailOptions, host, link;

router.get('/', (req,res) =>{
    res.sendFile('index.html')
});


router.get('/send', function (req, res) {
    rand=Math.floor((Math.random()*100)+54);
    console.log(rand);
    host = req.get('host');
    link = "http://"+host+"verify?id"+rand;
    mailOptions={
        to: req.query.to,
        subject: "Confirm Email",
        html: "Hello,<br> Please Click on the link to verify your email.<br><a href=\"+link+\">Click here to verify</a>"
    };

    console.log(mailOptions);
    transport.sendMail(mailOptions, function(err, res){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log("Message sent: " + res.message);
            res.send("Sent");
        }
    });

});

router.get('/verify', (req, res) => {
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});




