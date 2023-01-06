const mongoose = require('mongoose');



const contactsSchema = mongoose.Schema({


  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  question: { type: String, required: true },
  message: { type: String, required: true },

},

  { timestamps: true });

module.exports = mongoose.model('contacts', contactsSchema);


