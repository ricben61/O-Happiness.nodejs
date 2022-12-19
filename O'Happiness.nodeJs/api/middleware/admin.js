const users = require('../models/users')
 

module.exports = async (req, res, next) => {
   
    // console.log( req.auth.userId);
    const user = await users.findById(req.auth.userId)
    // console.log(user);
    if (user.role !=="Admin" ) {
        res.redirect('/')
    }
    next()
};