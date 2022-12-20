module.exports={
    
    get:(req, res) => {
        res.render('acceuil', { title: "acceuil",  active: {acceuil: true }})
    }
}


