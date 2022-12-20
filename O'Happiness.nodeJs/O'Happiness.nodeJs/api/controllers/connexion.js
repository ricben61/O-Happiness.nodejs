const users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

const LocalStorage = require('node-localstorage')


module.exports={
    get:(req,res) => {
        res.render('connexion',{active:{connexion:true}})
    },

    post:async(req, res, next) => {
       
        users.findOne({ name: req.body.name})
        
          .then (async users => {
             if (!users) {
                return res.status(401).render("connexion",{ error: 'Utilisateur non trouvé !' });
             }
            
            await bcrypt.compare(req.body.password,users.password) 
                     // console.log(req.body.password)
                     // console.log(users.password)
                 .then(valid => {
                     
                     if (!valid) {
                        return res.status(401).render("connexion",{ errors: 'Mot de passe incorrect !' });
                     }
                     
                     res.cookie("token",
                         
                         
                         jwt.sign(
                             {
                                name:users.name,
                                userId: users._id ,
                                role:users.role
                                },
                             'RANDOM_TOKEN_SECRET',
                             { expiresIn: '24h' },
                         )
                       
                     )


                      res.redirect("/")    
                     // console.log(LocalStorage);
                     
                 })
                 .catch(error => res.status(500).json({ error }));
         })
         .catch(error => res.status(500).json({ error }));
 
     },

     deleteCookie:  (req, res) => {

     res.clearCookie('token');
    
        res.redirect('/');

    }



}
