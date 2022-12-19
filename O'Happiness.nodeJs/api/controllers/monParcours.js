module.exports={
    get:(req,res) => {
        res.render('monParcours',{active:{monParcours:true}})
    }
}

