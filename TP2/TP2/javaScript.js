var modeEdit;
var un_id=0;
var clicked_id;
function afficherForm(){
    var aForm = document.getElementById("sectionForm");
    var aContainer = document.getElementById("notesContainer"); 
    aForm.style.display="block";                                //affiche le formulaire
    aForm.style.float="left";                                   //en float
    aContainer.style.marginLeft="500px";                        //rajoute une marge de 500px au id notesContainer
}
function effacerForm(){
    var aForm;
    aForm = document.getElementById("sectionForm");
    aForm.style.display="none";                                 //cache le formulaire
    
    var aContainer = document.getElementById("notesContainer"); 
    aContainer.style.marginLeft="30px";                         //remet la marge à 30px
    modeEdit = false;
}

function ajouterTag(){
  
    if (!modeEdit){                                                     // la différence entre ajouter/modifier
        var uneDate = new Date();
        var uneDateToString = uneDate.toISOString().replace(/[TO]/g, " à ").replace(/[:]/g, "h").substring(0,18);   //crée un string de la date selon le format (YY-MM-DD à HHhMM)
        var div=document.createElement("div");
        var paragraphe=document.createElement("p");
        var pinImage = document.createElement("img");
        pinImage.src = "./images/push-pin-red.png";
        pinImage.setAttribute('id','pin'+ un_id+"");                        //assigne un id pin[n] à la pin
        pinImage.setAttribute('onmouseover','showPinOption(this.id)');      //lorsque la souris est sur la pin, les options apparaissent
        
        var editPostImage= document.createElement("img");
        editPostImage.src = "./images/edit.png";
        editPostImage.style.float ="left";
        editPostImage.setAttribute('id','editPostImg'+ un_id+"");          // assigne un id edit[n] à l'icone delete'
        editPostImage.setAttribute('onclick','editForm(this.id)');  //lorsque clické l'icone edit est modifiable
        editPostImage.style.display="none" ;                            // l'icone edit est préalablement non-visible
        
        var deletePostImage= document.createElement("img");
        deletePostImage.src = "./images/delete.png";
        deletePostImage.style.float ="left";
        deletePostImage.setAttribute('id','delete'+ un_id+"");          // assigne un id delete[n] à l'icone delete'
        deletePostImage.setAttribute('onclick','deleteForm(this.id)');  //lorsque clické l'icone delete affiche une alerte
        deletePostImage.style.display="none" ;                          // l'icone delete est préalablement non-visible
        un_id++;
        
        var textnode = document.createTextNode(document.getElementById("submissionField").value);               //crée un text avec la valeur de <textarea>
        paragraphe.appendChild(pinImage);                               //crée la pin au paragraphe
        paragraphe.appendChild(textnode);                               //crée un texte au paragraphe

    
        switchTagsOption();                                             //méthode qui gère le menu Tags
        switchPin(pinImage);                                            //methode qui change la pin d'un post
        switchBackground(paragraphe) ;                                 //methode qui change le backrgound d'un post-it
    
        var aContainer = document.getElementById("notesContainer"); 
        div.appendChild(paragraphe);                                    //crée un paragraphe au div
        div.appendChild(editPostImage); 
        div.appendChild(deletePostImage); 
        div.appendChild(document.createTextNode(uneDateToString));      //ajoute la date à la fin du div   
        div.setAttribute('name','desPost')                              //donne un nom à tous les post-its
        div.setAttribute('id','div'+ un_id+"");                         //assigne un id div[n] à tous les post-its
        
        div.setAttribute('onmouseleave','hidePinOption(this.id)');      //lorsque la souris quitte le div, les option disparraissent
        aContainer.insertBefore(div,aContainer.childNodes[0]);          //insère le div au début du id notesContainer
        effacerForm();                                                  //méthode qui efface le formulaire lorsque annuler
       
       
      
        
        $(function() {
          localStorage [1]= JSON.stringify($(div.parentNode).html());           //save les divs dans le local storage
        });
    }else{
        editMode(clicked_id);                                                     //méthode qui modifie les post-its
    }
}
function switchBackground(paragraphe){
    var option = document.getElementById("select").value;
    if(option == "Rose"){
        paragraphe.style.backgroundColor ="#ff69b4";
        paragraphe.style.color ="white";
    }
    if(option == "Vert"){
        paragraphe.style.backgroundColor ="green";
    }
    if(option == "Noir"){
        paragraphe.style.backgroundColor ="black";
        paragraphe.style.color ="white";
    }
    if(option == "Jaune"){
    paragraphe.style.backgroundColor ="#F8F800";
    paragraphe.style.color ="black";
    }
}

function switchPin(pinImage){
     var radios = document.getElementsByName('importance');
    if (radios[0].checked) {                                    
       pinImage.src="./images/push-pin-blue.png";
    }
    if (radios[1].checked) {
       pinImage.src="./images/push-pin-green.png";
    }
     if (radios[2].checked) {
       pinImage.src="./images/push-pin-red.png";
    }
}
/**
 * méthode qui affiche le formulaire lorsque l'utilisateur clilck sur l'icone edit
 * change la fonctionalité du bouton ajouter/modifier
 */
function editForm(clicked_id){
    afficherForm();
    modeEdit = true;  
    this.clicked_id = clicked_id                                                     //il faudra modifier au lieu d'ajouter un post-it
}
/**
 * méthode qui gère le dernier post-it crée et offre de le modifier
 */
function editMode(clicked_id){
    var img_edit = document.getElementById(clicked_id);
    var div_pin = img_edit.parentNode;
    var p_pin = div_pin.getElementsByTagName("P")[0];
    var div_img = div_pin.getElementsByTagName("IMG")[0];             //la pin du dernier post-it crée
    var textnode2 = document.createTextNode(document.getElementById("submissionField").value);      //le nouveau text à modifier
    var img_edit= document.getElementById(clicked_id);
        
    p_pin.childNodes[1].parentNode.removeChild(p_pin.childNodes[1]);      //enlève le text du dernier <p> crée
    p_pin.appendChild(textnode2);                                        //crée un nouveau text au <p> avec le text du <textarea>
    switchBackground(p_pin);
    switchPin(div_img);
    effacerForm();
    
    $(function() {
  localStorage [1]= JSON.stringify($(p_pin.parentNode.parentNode).html());           //save les divs dans le local storage
});
}
/**
 * méthode qui affiche une alerte pour supprimer un post-it
 * si oui enlève tous les enfants du div, sinon aucune opération
 * @param clicked_id le id du div
 */
function deleteForm(clicked_id){
    var reponse = confirm("Êtes-vous sûr de vouloir supprimer ce Post-it?");
    if (reponse == true){
        var img_delete= document.getElementById(clicked_id);
        var div_delete = img_delete.parentNode;
        div_delete.parentNode.removeChild(div_delete);
    }
}
/**
 * méthode qui affiche les options lorsque la sourris est sur la pin
 * @param clicked_id le id du div
 */
function showPinOption(clicked_id){
    var option_visible;                                     //booléen qui permet d'afficher ou non les options dans le div 
    var img_pin = document.getElementById(clicked_id);
    var p_pin   = img_pin.parentNode;
    var div_pin = p_pin.parentNode;
    var div_img = div_pin.getElementsByTagName("IMG");                  //tableau des images du div
    div_pin.setAttribute('onmouseover','showDivPinOption(this.id)');    //si la souris quitte la pin, les options sont toujours affichées
    for (var i = 3; i < div_img.length;i++){                            //les options commencent à partir de la 4e images du tableau                      
        div_img[i].style.display="block" ;
    }
    option_visible = true;
    showDivPinOption(div_pin.id, option_visible);                       
 
}
/**
 * méthode qui affiche les options lorsque la sourris quitte la pin
 * @param clicked_id le id du div
 * @param option_visible si la souris a été sur la pin ou non
 */
function showDivPinOption(clicked_id, option_visible){
    if (option_visible){
        var div = document.getElementById(clicked_id);
        var div_img = div.getElementsByTagName("IMG");
        
        for (var i = 1; i < div_img.length;i++){
        div_img[i].style.display="block" ;
        }
    }   
    
}
/**
 * méthode qui cache les options lorsque la souris quitte le div
 * @param clicked_id le id du div
 */
function hidePinOption(clicked_id){                                 
 
    var div = document.getElementById(clicked_id);              
    var div_img = div.getElementsByTagName("IMG");
 
    for (var i = 1; i < div_img.length;i++){
        div_img[i].style.display="none" ;
    }
          
}
/**
 * méthode qui déroule le menu d'options des tags
 * 
 */
function switchTagsOption(){
    var unTag = document.getElementsByName('desTags')[0].value;
    if (unTag != undefined && !estLaMemeString(unTag)){
    var uneDatalist = document.getElementsByTagName("datalist")[0];
    var uneOption = document.createElement("option");
    uneOption.setAttribute('value', unTag);
    uneOption.setAttribute('name', "desOptions");
    uneDatalist.appendChild(uneOption);
    
   }
    document.getElementById("input3").value = "";                   //efface le buffer de l'historique
}

/**
 * méthode qui compare les options des tags avec le paramètre
 * @param aString la string à comparer
 */
function estLaMemeString(aString){
    var desTagsArray = document.getElementsByName('desOptions');
    var est_dans_le_tableau = false;
    for (var i=0;i<desTagsArray.length;i++){

       var unTag = desTagsArray[i];
       unTag = unTag.value;
       if (unTag.localeCompare(aString)==0) {
           est_dans_le_tableau = true;
           i = desTagsArray.length;
       }
    }
    return est_dans_le_tableau;
}


function reload(){

         $(function() {
          
           if (localStorage[1] != null) {
              var contentsOfOldDiv = JSON.parse(localStorage[1]);    
              $("div#notesContainer").html(contentsOfOldDiv);
             } 
        });
    
}
