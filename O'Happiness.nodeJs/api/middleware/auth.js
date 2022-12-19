const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
   // console.log("coucou");
   try {
      // console.log(req.cookies);
      //    const token = req.headers.authorization.split(' ')[1];
      const token = req.cookies.token
      //    console.log(req.headers);
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId
      
      //    console.log(userId);
      req.auth = {
         
         userId: userId
      }
     
      // console.log(name);
      next();
   } catch (error) {
      console.log("probleme d'auth");
      res.redirect("/");
   }
};

