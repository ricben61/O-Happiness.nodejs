const users= require ('../models/users')

module.exports={
    get: async(req, res) => {

       await users.find(req.params.id).lean().exec((err, usersData) => {
            if (usersData) {
                res.render('gestion', {data:usersData,active:{gestion:true}});
        }
    }

)},


    delete: async (req, res) => {

       await users.findByIdAndDelete(req.params.id)

      res.redirect('back')
        }


}
