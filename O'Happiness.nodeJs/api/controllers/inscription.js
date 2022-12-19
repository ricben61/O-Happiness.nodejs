const users = require('../models/users');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


module.exports = {
    get: async (req, res) => {
        if (req.params.id) {
            const user = await users.findById(req.params.id).lean()
            // console.log(collection);

            res.render('inscription', { updateUsers: true, 'users': user ,active:{inscription:true} })
        } else {
            res.render('inscription')
        }
    },
    post:async (req, res) => {

        const errors = validationResult(req)
            let body = req.body;
            let get = {name : body.name, email: body.email}
       
            if (!errors.isEmpty()) {

            return res.status(422).render('inscription', { errors: errors.array(),get:get });
        }
      
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






