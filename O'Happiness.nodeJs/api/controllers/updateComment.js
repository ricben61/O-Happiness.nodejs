const commentaire = require('../models/commentaire');
const users= require ('../models/users')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PASS_SECRET = process.env.PASS_SECRET

module.exports={
    get: async(req, res) => {

       const commentaireId= await commentaire.findById(req.params.id).lean()
        
        

        res.render('updateComment',commentaireId )

},

put: async (req, res) => {

    const token = req.cookies.token
    const decodedToken = jwt.verify(token, PASS_SECRET);
    const userId = decodedToken.userId;
    const commentId = await commentaire.findByIdAndUpdate(req.params.id).lean()
    const role = decodedToken.role

    if(role === "Admin"  || role === "Moderateur"){
        await commentaire.findByIdAndUpdate(req.params.id, {

            description: req.body.description,
             
         })
         res.redirect('/avisClients/')  
    }

    else{
    if (userId === commentId.userId ) {

        await commentaire.findByIdAndUpdate(req.params.id, {

           description: req.body.description,
           
        })
        res.redirect('/avisClients/')
    } else {
        res.redirect('/avisClients/')
    }
  }
},

}