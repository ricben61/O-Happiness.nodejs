const commentaire = require('../models/commentaire');
const users = require('../models/users')

module.exports = {
    get: async (req, res) => {

        await users.find(req.params.id).lean().exec((err, usersData) => {
            if (usersData) {
                // pour afficher la page et gestion a true pour que la navbar puisse savoir quelle page est active//
                res.render('gestion', { data: usersData, active: { gestion: true } });
            }
        }

        )
    },


    delete: async (req, res) => {
        // fonction findByIdAndDelete, permet de recher et de supprimer l'utilisateur par rapport a son id//

        await users.findByIdAndDelete(req.params.id)
        await commentaire.deleteMany({ userId: req.params.id })

        if (res.locals.role === "User" || res.locals.role === "Mod") {
            res.clearCookie('token');
            return res.redirect('/')
        }


        // redirect back pour rester sur la meme page en l'actualisant//

        res.redirect('back')
    }


}
