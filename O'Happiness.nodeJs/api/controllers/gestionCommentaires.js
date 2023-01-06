
const commentaire = require('../models/commentaire');
const users= require ('../models/users')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PASS_SECRET = process.env.PASS_SECRET

module.exports={
    get: async(req, res) => {
        const perPage = 6;
        const page = req.query.p;

        const token = req.cookies.token
      
       const decodedToken = jwt.verify(token, PASS_SECRET );
    //    on crée des constantes pour pour dechifrer et trouver le bon utilisateur
       const userId = decodedToken.userId;  


      const userData= await users.findById(userId).lean()
           
       
           const commentaireData = await commentaire.find({userId:userId}).sort( {createdAt : -1 } ).skip((perPage * page) - perPage).limit(perPage).lean().exec(async (err, commentaireData) => { 
            await commentaire.find({userId:userId}).countDocuments().lean().exec((err, count) => {

                if (err) {
                    req.flash('error_msg')
                    return res.redirect('/')
                }

                if (commentaireData) {

                res.render('gestionCommentaires', {commentaire:commentaireData,user:userData,active:{gestionCommentaires:true}, 
                data: commentaireData, pagination: {
                    page: req.query.p || 1,
                    pageCount: Math.ceil(count/ perPage)

                }
            });
        }
     } )

})}

}
