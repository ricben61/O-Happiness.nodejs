const mongoose = require('mongoose');



const commentaireSchema = mongoose.Schema({
 
  description: { type: String, required: true },
  userId:  { type: String }, 
  userName:{type:String},
},
    
{ timestamps: true });

module.exports = mongoose.model('commentaire', commentaireSchema);