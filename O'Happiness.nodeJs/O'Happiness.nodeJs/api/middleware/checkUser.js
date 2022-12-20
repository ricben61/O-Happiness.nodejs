const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, 'RANDOM_TOKEN_SECRET', async (err, decodedToken) => {

            if (err) {
                // console.log(err.message);
                res.locals.users = null;
                
                next();
            }
            else {
                res.locals.userId=decodedToken.userId
                res.locals.name = decodedToken.name
                res.locals.role = decodedToken.role
                if ( decodedToken.role === "Admin"){
                   res.locals.Admin = decodedToken.role

                }
                if (decodedToken.role === "Moderateur") {
                    res.locals.Moderateur = decodedToken.role
                }
                if (decodedToken.role === "Admin" || decodedToken.role === "Moderateur" ){
                    res.locals.AdMod = decodedToken.role
                }
                if (decodedToken.role === "User" || decodedToken.role === "Admin" || decodedToken.role === "Moderateur" ){
                    res.locals.UsAdMod = decodedToken.role
                }
                if (decodedToken.userId === "userId"){
                    res.locals.userId = decodedToken.userId 
                }
                if (decodedToken.role === "User"){
                    res.locals.User = decodedToken.role 
                }
                

                next();
            }

        })
    }
    else {
        res.locals.users = null;

        next();
    }

}