

 function myFunction() {
    const x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  function myFunction2() {
    const x = document.getElementById("myInput2");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

 
  let mybutton = document.getElementById("btn-back-to-top");

// quand l'utilisateur scroll de 20 px, la fleche apparait-----------------------//
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
//--------------- evenement click pour que l'utilisateur remonte en haut de page---------------------------//
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
  
//--------------------------------------- fonction pour en voir plus sur la page outils et methodes----------------------------------------//

  let VoirPlusOutilsetMethodes = document.getElementById("VoirPlusOutilsetMethodes");
  let btnVoirPlusOutilsetMethodes = document.getElementById("btnVoirPlusOutilsetMethodes");



  btnVoirPlusOutilsetMethodes.addEventListener("click", () => {
    if(getComputedStyle(VoirPlusOutilsetMethodes).display != "none"){
      VoirPlusOutilsetMethodes.style.display = "none";
    } else {
      VoirPlusOutilsetMethodes.style.display = "block";
    }
  })

  //-----------------------------fonction recherche dans page avis client--------------------------------//

