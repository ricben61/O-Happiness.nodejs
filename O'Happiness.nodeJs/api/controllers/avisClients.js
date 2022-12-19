
const users = require('../models/users');
const commentaire=require('../models/commentaire');
const jwt = require('jsonwebtoken');
const { data } = require('jquery');




module.exports={
    get: async (req, res) => {
    //     const count = 5;
    //     const perPage = 20;
    //     const page = req.query.p;
        
        
    //     await commentaire.find(req.params.id).skip((count * page) - count).limit(count).lean().exec((err, commentairesData) => {
    //             if(commentairesData){
    //     res.render('avisClients', {  data: commentairesData, pagination:{page:req.query.p ||1, pageCount: Math.ceil(perPage /count)}})

    //     }},
                         
    // )
   
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
      
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //    on crée des constantes pour pour dechifrer et trouver le bon utilisateur
       const userId = decodedToken.userId;  
        const user =  await users.findById(userId).lean()

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {                   
        //     let body = req.body;
        //     let get = {commentaire : body.commentaire}
        //     return res.status(422).render('description', { errors: errors.array(),get:get });
        // }
        // console.log(user);
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
        
    }, put: async (req, res) => {

        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const commentId = await commentaire.findById(req.params.id).lean()
        const role = decodedToken.role

        if(role === "Admin"  || role === "Moderateur"){
            await commentaire.findByIdAndUpdate(req.params.id, {

                description: req.body.description,
                 
             })
             res.redirect('back')
        }

        else{
        if (userId === commentId.userId ) {

            await commentaire.findByIdAndUpdate(req.params.id, {

               description: req.body.description,
                
            })
            res.redirect('back')
        } else {
            res.redirect('back')
        }
      }
    },



    deleteComment: async (req, res) => {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const commentId = await commentaire.findById(req.params.id).lean()
        const role = decodedToken.role
            console.log("coucou");
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
