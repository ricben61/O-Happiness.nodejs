const contacts = require('../models/contacts');
const users = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const PASS_SECRET = process.env.PASS_SECRET

module.exports = {
    get: async (req, res) => {

        const perPage = 6;
        const page = req.query.p;

        await contacts.find(req.params.id).sort( {createdAt : -1 } ).skip((perPage * page) - perPage).limit(perPage).lean().exec(async (err, contactsData) => {
            await contacts.find(req.params.id).countDocuments().lean().exec((err, count) => {
               
               
                if (err) {
                    req.flash('error_msg')
                    return res.redirect('/')
                }
    
                if (contactsData) {
    
                    res.render('gestionContacts', { data: contactsData, active: { gestionContacts: true },
                        data: contactsData, pagination: {
                            page: req.query.p || 1,
                            pageCount: Math.ceil(count/ perPage)
    
                        }
                    });
                }
    
            })
        });







        // await contacts.find(req.params.id).lean().exec((err, contactsData) => {
        //     if (contactsData) {
        //         // pour afficher la page et gestion a true pour que la navbar puisse savoir quelle page est active//
        //         res.render('gestionContacts', { data: contactsData, active: { gestionContacts: true } });
        //     }
        // }

        // )
    },


    deleteContacts: async (req, res) => {
     
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, PASS_SECRET);
                
        const role = decodedToken.role
            
            
        if(role === "Admin"  || role === "Moderateur"){
            await contacts.findByIdAndDelete(req.params.id)
             res.redirect('back')
        }

  
    },


}
