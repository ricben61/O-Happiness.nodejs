module.exports={
    
    get:(req, res) => {
        res.render('accueil', { title: "accueil",  active: {accueil: true }})
    }
}


