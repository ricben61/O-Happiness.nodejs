const { check, validationResult } = require('express-validator');

const users = require('../models/users');

exports.validateUserSignUp = [
    check('name').toLowerCase().trim().escape().isLength({min:3, max:20}).
    withMessage('Le nom doit faire entre 3 et 20 caracteres!')
    .custom(async (value, {req, loc, path}) => {
        const user = await users.findOne({
            name: req.body.name,
        });
        if (user) {
            return Promise.reject("le nom d'utilisateur est déjà utilisé");
        }
    }),
    
    check('email').toLowerCase().isEmail().withMessage('Email non valide')
    // check('password').trim().escape().not().isEmpty().isLength({min:5, max:20}).
    // withMessage('Le mot de passe doit faire minimum 5 character!'),
    .custom(async (value, {req, loc, path}) => {
        const email = await users.findOne({
            email: req.body.email,
        });
        if (email) {
            return Promise.reject("l'email' est déjà utilisé");
        }
    }),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("votre mot de passe doit contenir entre 8 et 15 caracteres")
      .matches(/\d/)
      .withMessage("votre mot de passe doit contenir min 1 chiffre")
      .matches(/[!@#$%^&*(),.?:|]/)
      .withMessage("votre mot de passe doit contenir 1 caractere spécial entre (!@#$%^&*(),.?:|)"),

    check('confirmPassword').trim().custom((value, {req}
        ) => {
        if(value !== req.body.password){
            throw new Error('Les deux mots de passe doivent être identique')
        }
        return true;
    })
];


exports.validateUserUpdate = [
    
    check('name').toLowerCase().trim().escape().isLength({min:3, max:20}).
    withMessage('Le nom doit faire entre 3 et 20 caracteres!')
    .custom (async (value, {req, loc, path}) => {
        //on recupere l'utilisateur par son id
        const user = await users.findById(req.params.id);
        //console log pour s'assurer que nous recuperont l'id
        // console.log(user.name);
        // console.log(req.body.name);
            // si le name est different du form
        if (user.name !== req.body.name) {
            // console.log('les noms son différent');
            //je cherche  le nom dans la bdd
         const verif = await users.findOne({name:req.body.name})
            // console.log(verif);
            //si la recherche me renvoie quelque chose 
          if (verif) {
            //je renvoie que le nom exist déja
            return Promise.reject("le nom d'utilisateur est déjà utilisé");
           }
        }

    }),
   
    
    check('email').toLowerCase().isEmail().withMessage('Email non valide')
    // check('password').trim().escape().not().isEmpty().isLength({min:5, max:20}).
    // withMessage('Le mot de passe doit faire minimum 5 character!'),
    .custom (async (value, {req, loc, path}) => {
        //on recupere l'utilisateur par son id
        const user = await users.findById(req.params.id);
        //console log pour s'assurer que nous recuperont l'id
        // console.log(user.email);
        // console.log(req.body.email);
            // si l'email est different du form
        if (user.email !== req.body.email) {
            // console.log('l"email est différent');
            //je cherche  le nom dans la bdd
         const verif = await users.findOne({email:req.body.email})
            // console.log(verif);
            //si la recherche me renvoie quelque chose 
          if (verif) {
            //je renvoie que le nom exist déja
            return Promise.reject("l'email est déjà utilisé");
           }
        }
    }),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("votre mot de passe doit contenir entre 8 et 15 caracteres")
      .matches(/\d/)
      .withMessage("votre mot de passe doit contenir min 1 chiffre")
      .matches(/[!@#$%^&*(),.?:|]/)
      .withMessage("votre mot de passe doit contenir 1 caractere spécial entre (!@#$%^&*(),.?:|)"),

    check('confirmPassword').trim().custom((value, {req}
        ) => {
        if(value !== req.body.password){
            throw new Error('Les deux mots de passe doivent être identique')
        }
        return true;
    })
];



// exports.userValidation = (res, req, next) => {
//     const result = validationResult(req).array();
//     console.log(result);
// }