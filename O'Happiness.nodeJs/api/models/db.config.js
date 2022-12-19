const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://benoit:Developpeur61.@blog.uf04uu1.mongodb.net/database", {
    useNewUrlParser:true,
    useUnifiedTopology:true
},

(err) => {
    if (!err) {
        console.log("connexion mon petit lapin");
    }else{
        console.log("connexion échoué" + err);
    }
});

require('./commentaire');
require('./users');
