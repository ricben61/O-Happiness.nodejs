const express = require('express')
const router = express.Router()
const acceuil = require('./controllers/acceuil')
const inscription = require('./controllers/inscription')
const connexion = require('./controllers/connexion')
const gestion = require('./controllers/gestion')
const astuces = require('./controllers/astuces')
const monParcours=  require('./controllers/monParcours')
const outilsEtMethodes=require('./controllers/outilsEtMethodes')
const prestations=require('./controllers/prestations')
const contact=require('./controllers/contact')
const avisClients = require('./controllers/avisClients')


//------------------- mes middleware------------------
const multer= require('./middleware/multer')
const validUsers= require('./middleware/validUsers')
const auth = require('./middleware/auth')
const admin = require('./middleware/admin')
const checkUsers=require('./middleware/checkUser')
const validConnexion=require('./middleware/validConnexion')


router.route('/')
    .get(acceuil.get)

router.route('/monParcours')
    .get(monParcours.get)

router.route('/outilsEtMethodes')
    .get(outilsEtMethodes.get)


router.route ('/astuces') 
    .get(astuces.get)

router.route ('/prestations') 
    .get(prestations.get)  
    
router.route ('/contact') 
    .get(contact.get)      


router.route('/deleteUser/:id')
    .delete(gestion.delete)

router.route ('/updateUser/:id')
    .get(inscription.get)
    .put(validUsers.validateUserUpdate,inscription.put) 
       

router.route('/inscription')
    .get(inscription.get)
    .post(validUsers.validateUserSignUp,inscription.post)


router.route('/connexion')
    .get(connexion.get)
    .post(validConnexion.validConnexion,connexion.post )

router.route('/deleteCookie')
    .delete(connexion.deleteCookie)

router.route('/gestion')
    .get(auth,admin,gestion.get)
   
router.route('/avisClients/')
    .get(avisClients.get)
    .post(checkUsers,avisClients.post)

router.route('/updateComment/:id')
    .put(avisClients.put)

router.route('/deleteComment/:id')
    .delete(auth,checkUsers,avisClients.deleteComment)

module.exports = router