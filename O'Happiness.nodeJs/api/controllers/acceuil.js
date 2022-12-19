module.exports={
    // get:(req,res) => {
    //     res.render('acceuil')
    // }
    get:('/acceuil', function(req, res) {
        res.render('acceuil', { title: "acceuil",  active: {acceuil: true }})
    })
}


