const nodemailer =require('nodemailer');



    

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service:"gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user:'brigitesbrigites@gmail.com', 
      pass: 'xbbveetzoypmtirl', 
    },

  });
  








module.exports={
    get:(req,res) => {
        res.render('contact',{active:{contact:true}})
    },


    post:async (req, res) => {

        // console.log("coucou");
        const { nom,prenom, email, question, message } = req.body;

        const mailOptions={
            from:"brigitesbrigites@gmail.com",
            to:'brigitesbrigites@gmail.com',
            subject:`${question}`,
            html: `Vous avez un nouveau message de  <br>
            Nom: ${nom}<br>
            Prénom:${prenom}<br>
            Email : ${email}<br>
            Question:${question}<br>
            Message: ${message}<br>`,
          };

          transporter.sendMail(mailOptions, (error, responose) => {
            if(error) {
                console.log(error);
                res.send("error")
            } else {
                console.log("Email envoyer");
                res.render("/")
            } 
        });

       
       
        
    }






}
