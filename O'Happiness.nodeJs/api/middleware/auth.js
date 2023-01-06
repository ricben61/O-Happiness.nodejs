const jwt = require('jsonwebtoken');
require('dotenv').config();


const PASS_SECRET = process.env.PASS_SECRET

module.exports = (req, res, next) => {

   const token = req.cookies.token
   if (token) {

      try {

         const decodedToken = jwt.verify(token, PASS_SECRET);
         const userId = decodedToken.userId

         req.auth = {

            userId: userId
         }

         next();
      } catch (error) {
         console.log("probleme d'auth");
         res.redirect("/");
      }
   } else {
      res.redirect("/")
   }
};

