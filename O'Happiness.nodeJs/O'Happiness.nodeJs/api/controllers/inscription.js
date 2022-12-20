const users = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


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
    
    post:async (req, res) => {

        const errors = validationResult(req)
            let body = req.body;
            let get = {name : body.name, email: body.email}
       
            if (!errors.isEmpty()) {

            return res.status(422).render('inscription', { errors: errors.array(),get:get });
        }
        // je créer une fonction pour hasher le mot de passe
        const passwordHash = bcrypt.hashSync(req.body.password, 10);

        let newUser = new users({
            name: req.body.name.toLowerCase(),
            email: req.body.email,
            password: passwordHash,
           
        })
        newUser.save().then(
            () => {
                res.redirect("/");
            }
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
        
        const passwordHash = bcrypt.hashSync(req.body.password,10);

        await users.findByIdAndUpdate(req.params.id, {
            name: req.body.name.toLowerCase(),
            email: req.body.email,
            password: passwordHash,
            role:req.body.role,

        }),
        
        res.redirect('/gestion')
    }

}






