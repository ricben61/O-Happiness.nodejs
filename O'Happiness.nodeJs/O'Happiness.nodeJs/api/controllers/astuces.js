module.exports={
    get:('/astuces', function(req, res) {
        res.render('astuces', { title: "astuces",  active: {astuces: true }})
    })
}

