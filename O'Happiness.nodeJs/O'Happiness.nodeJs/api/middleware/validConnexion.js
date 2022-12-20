const { check, validationResult } = require('express-validator');

const users = require('../models/users');

exports.validConnexion = [
    check('name').trim().escape().isLength({min:3, max:20}).
    withMessage('Le nom doit faire entre 3 et 20 caracteres!')
    

   ,
      
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("votre mot de passe doit contenir entre 8 et 15 caracteres")
      .matches(/\d/)
      .withMessage("votre mot de passe doit contenir min 1 chiffre")
      .matches(/[!@#$%^&*(),.?:|]/)
      .withMessage("votre mot de passe doit contenir 1 caractere spécial entre (!@#$%^&*(),.?:|)"),

];
