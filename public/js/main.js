/*

- Uniformisé la création des <li> de matchs
  - Création quand extrait de la BD
  - Création lors de l'ajout d'un match

- Passé les information en notation JSON

- Retour de fonction php en notation JSON pour laisser le front ENd gérer le «quoi-faire» avec la donnée

*/

function findMatchs_search(){ 
    var $matchList = $("#matchsList");
    $matchList.show(); 
//Requête et présentation des dates disponibles
    $.post("../php/findMatchs.php", function(data){
     if (data.length>0){ 
       $matchList.html(data); 
     }
    });

    setTimeout(
      function(){
        $matchList.find('.glyphicon-remove').click(function() {
          $(this).parent().remove();
        });

        $matchList.find('span').click(function() {
          var $matchName = $(this).text();
          $('.main').hide();
          $('.matchHome').show();
        });

      }, 500);
  } 

function creerLstDeroul(){
   $.post("../php/lstDeroulante.php", function(data){
             $("#divLstDeroul").html(data);
         })
  }

Date.prototype.yyyymmdd = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
};

$(document).ready(function () {
    findMatchs_search();

        //On boucle sur chaque élément pour activer le boutton de suppression

/*    console.log($mainDiv);

     $mainDiv.each(function(){
      var $matchLi = $(this);

      console.log('roger');
      console.log($matchLi);

      $matchLi.find("span").css({"color": "red", "border": "2px solid red"});

      $matchLi.find('li').each(function(){
        console.log('béatroice');
        console.log($(this));

        $(this).find('.glyphicon-remove').click(function() {
          $(this).parent().remove();
        });
      });

      
     });
*/
/*
    creerLstDeroul();

    $("#searchResults").slideUp(); 

    $("#search_button").click(function(e){ 
        e.preventDefault(); 
//    displayVals();
        ajax_search(); 
       }); 
*/
  $('#title-form .button').click(function() {
    var title = $('#title-input').val();
    $('.list-title').text(title);
    $('#title-input').val('');
  });

  $('#item-form .button').click(function() {
    var itemText = $('#item-input').val();
    if (itemText == "") {
      var sysDate = new Date();
      itemText = ( sysDate.yyyymmdd());
    }
    var $item = $('<li><span>' + itemText + '</span><i class="glyphicon glyphicon-remove"></i></li>');
    $('.list').prepend($item);
    $('#item-input').val('');

    $item.find('.glyphicon-remove').click(function() {
      $(this).parent().remove();
    });

    $item.find('span').click(function() {
          var $matchName = $(this).text();
          $('.main').hide();
          $('.matchHome').show();
    });
  });

    //Cacher/Montrer sections de recherche
  $('#chkTowCap').click(function(){
               if ($('#chkTowCap').is(':checked')){
                    $('#divTowCap').slideDown();
               }
               else {$('#divTowCap').slideUp();
               }
              });
  $('#chkFreeTxt').click(function(){
               if ($('#chkFreeTxt').is(':checked')){
                    $('#divFreeTxt').slideDown();
               }
               else {$('#divFreeTxt').slideUp();
               }
              });
});