
const users = require('../models/users');
const commentaire=require('../models/commentaire');
const jwt = require('jsonwebtoken');
const { data } = require('jquery');
require('dotenv').config();


const PASS_SECRET = process.env.PASS_SECRET



module.exports={
    get: async (req, res) => {
      
    const perPage = 6;
    const page = req.query.p;

    await commentaire.find(req.params.id).sort( {createdAt : -1 } ).skip((perPage * page) - perPage).limit(perPage).lean().exec(async (err, commentaireData) => {
        await commentaire.find(req.params.id).countDocuments().lean().exec((err, count) => {

            if (err) {
                req.flash('error_msg')
                return res.redirect('/')
            }
            if (commentaireData) {

                res.render('avisClients', {active:{avisClients:true},
                    data: commentaireData, pagination: {
                        page: req.query.p || 1,
                        pageCount: Math.ceil(count/ perPage)

                    }
                });
            }

        })
    });

},
    post: async (req, res) => {
 
    //  console.log(req.params.id)
      //on recupere l'element token des cookies pour pouvoir le dechiffrer  
        const token = req.cookies.token
      
       const decodedToken = jwt.verify(token, PASS_SECRET);
    //    on crée des constantes pour pour dechifrer et trouver le bon utilisateur
       const userId = decodedToken.userId;  
        const user =  await users.findById(userId).lean()

       
           let newCommentaire= new commentaire({
               description: req.body.description,
               userId: userId,
               userName:user.name,
               
              
               
           })
             newCommentaire.save().then(
                () => {
                   res.redirect("/avisClients/");
                }
            ).catch(
                (error) => {
                    console.log(error.message);
                    res.redirect("back");
                }
            )
        
    }, 



    deleteComment: async (req, res) => {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, PASS_SECRET);
        const userId = decodedToken.userId;
        const commentId = await commentaire.findById(req.params.id).lean()
        const role = decodedToken.role
            // console.log("coucou");

        if(role === "Admin"  || role === "Moderateur"){
            await commentaire.findByIdAndDelete(req.params.id)
             res.redirect('back')
        }

        else{
        if (userId === commentId.userId ) {

            await commentaire.findByIdAndDelete(req.params.id)
            res.redirect('back')
        } else {
            res.redirect('back')
        }
      }
  
    },
   
}
