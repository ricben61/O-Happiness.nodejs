module.exports={
    get:(req,res) => {
        res.render('prestations',{active:{prestations:true}})
    }
}
