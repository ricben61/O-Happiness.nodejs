const users = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const nodemailer =require('nodemailer');


require('dotenv').config();
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PASS = process.env.EMAIL_PASS
const EMAIL_HOST = process.env.EMAIL_HOST
    


let transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    service:"gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER, // generated ethereal user
      pass: EMAIL_PASS, // generated ethereal password
    },

  });

let rand,mailOptions,host,link  //création de variable sans affectation 






module.exports = {



    get: async (req, res) => {
        if (req.params.id) {
            const user = await users.findById(req.params.id).lean()
            // pour afficher la page inscription a true pour que la navbar puisse savoir quelle page est active//
            // j'ai fait un if pour que ca affiche soit la page user ou la page pour modifier l'utilisateur//

            res.render('inscription', { updateUsers: true, 'users': user ,active:{inscription:true} })
        } else {

            // pour afficher la page inscription a true pour que la navbar puisse savoir quelle page est active//
            res.render('inscription', {active:{inscription:true} })
        }
    },

    getVerify:async (req,res)=>{ 

        // console.log(req.params.id);
        // console.log(rand);
        // console.log(mailOptions);

        if (rand == req.params.id) {
           
          const userMail= await users.findOne({email:mailOptions.to})
            if (userMail.email=== mailOptions.to ) {
                await users.findOneAndUpdate ({email:mailOptions.to},{isVerify:true})
                    res.render('verify')
            }else{
                res.redirect('/')
            }
        }else{
            res.redirect('/')
        }

        

    },
    
    post:async (req, res) => {

        rand = Math.floor ((Math.random()*100)+54)//pour crée un chiffre aleatoire
        host = req.get('host') //recupere l'adress du site hebergant le mail
        link = "http://"+host+"/verify/" + rand
        mailOptions={
            from:EMAIL_USER,
            to: req.body.email,
            subject:'merci de confirmer votre compte mail',
            rand:rand,
            html:"bonjour.<br> Merci de cliquer sur le lien pour verifier votre adresse mail <br> <a href=" + link + ">Cliquer ici pour verifier</a>" //contenue qui s'affiche dans la boite mail de l'utilisateur.

        }


        const errors = validationResult(req)
            let body = req.body;
            let get = {name : body.name, email: body.email}
       
            if (!errors.isEmpty()) {

            return res.status(422).render('inscription', { errors: errors.array(),get:get });
        }
        // je créer une fonction pour hasher le mot de passe
        const passwordHash = bcrypt.hashSync(req.body.password, 10);

        let newUser = new users({
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
           
        })
        newUser.save().then(
            
               transporter.sendMail(mailOptions,(err,res,next)=>{
                    if(err){
                    //    console.log("1");
                        console.log(err);
                    }else{
                // console.log("2");
                next()
            }
             
            },res.redirect("connexion")
            
            )
           


        ).catch(
            (error) => {
                console.log(error.message);
                res.redirect("back");
            }
        )

    },
    
    put: async (req, res) => {
        
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            const user = await users.findById(req.params.id).lean()
 
            return res.status(422).render('inscription', { errors: errors.array(),  updateUsers: true, 'users': user });
        }
        
       
        await users.findByIdAndUpdate(req.params.id, {
            name: req.body.name.toLowerCase(),
            email: req.body.email,
           
            role:req.body.role,

        }),
        
        res.redirect('/gestion')
    }

}






