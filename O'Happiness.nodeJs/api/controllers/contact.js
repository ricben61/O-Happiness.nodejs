const nodemailer = require('nodemailer');
const contact = require('../models/contacts');

require('dotenv').config();
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_HOST = process.env.EMAIL_HOST


let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },

});

module.exports = {
    get: (req, res) => {
        res.render('contact', { active: { contact: true } })
    },


    post: async (req, res) => {




        // console.log("coucou");
        const { nom, prenom, email, question, message } = req.body;

        let newcontact = new contact({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            question:req.body.question,
            message: req.body.message,
           
        })
        newcontact.save().then()


        const mailOptions = {
            from: EMAIL_USER,
            to: EMAIL_USER,
            subject: `${question}`,
            html: `Vous avez un nouveau message de  <br>
            Nom: ${nom}<br>
            Prénom:${prenom}<br>
            Email : ${email}<br>
            Question:${question}<br>
            Message: ${message}<br>`,
        };

        transporter.sendMail(mailOptions, (error, responose) => {
            if (error) {
                console.log(error);
                res.send("error")
            } else {
                console.log("Email envoyer");
                res.redirect("/")
            }
        });




    }






}
