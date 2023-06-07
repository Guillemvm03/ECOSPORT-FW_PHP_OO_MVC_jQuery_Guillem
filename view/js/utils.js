function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
}


function click_logout() {
  $(document).on('click', '#logout-user', function() {
      localStorage.removeItem('total_prod');
      toastr.success("Logout succesfully");
      setTimeout('logout(); ', 1000);
  });


}

//================LOG-OUT================
function logout() {
  // console.log('hola');
  ajaxPromise(friendlyURL("?module=login&op=logout"), 'POST', 'JSON')
      .then(function(data) {
          localStorage.removeItem('token');
          window.location.href = "index.php?module=ctrl_home&op=list";
          location.reload();
      }).catch(function() {
          console.log('Something has occured');
      });
}


function click_cart() {


    $(document).on('click', '#cart-user', function() {
      
      // load_cart();
      setTimeout(function() {
        window.location.href = friendlyURL("?module=cart");
    }, 300);
  });


}


/* FRIENDLY URL */
function friendlyURL(url) {
  var link = "";
  url = url.replace("?", "");
  url = url.split("&");
  cont = 0;
  for (var i = 0; i < url.length; i++) {
    cont++;
      var aux = url[i].split("=");
      if (cont == 2) {
        link += "/" + aux[1] + "/";	
      }else{
        link += "/" + aux[1];
      }
  }
  return "http://localhost/FW_PHP_OO_MVC_jQuery_Guillem" + link;
}


/* LOAD MENU */


function load_menu() {


    $('<a></a>').attr('href', friendlyURL("?module=home")).text('Home').appendTo('.nav_h');
    $('<a></a>').attr('href', friendlyURL("?module=shop")).text('Shop').appendTo('.nav_s');
    $('<a></a>').attr('href', friendlyURL("?module=contact")).text('Contact').appendTo('.nav_c');
    $('<a></a>').attr('href', friendlyURL("?module=login")).addClass('steammes').appendTo('.nav_l');
    
    
    
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL("?module=login&op=data_user"), 'POST', 'JSON', { 'token': token })
            .then(function(data) {
                // console.log(data);
                
                $('.steamie').empty();

                $('<div></div>').appendTo('#dropmenu')
                .html(
      
            '<div id="all-dropmenu">'+
              '<ul>'+
                '<li class="drop">'+
                  '<div class="user-avatar">'+
                
                  '<img src='  + data[0].avatar +' width="120" height="100">'+
                  '<div class="dropdownContain">'+
                    '<div class="dropOut">'+
                      '<ul>'+
                        '<li > | <i class="fa-solid fa-user" style="color: #d3d4d4;"></i><span aria-hidden="true" class="iconn-user"></span> '+data[0].username+'</li>'+
                        '<li id="cart-user"> | <i class="fa-solid fa-cart-shopping" style="color: #dbdbdb;"></i> <span aria-hidden="true" class=""></span> Cart </li>'+
                        '<li id="logout-user"> | <i class="fa-solid fa-right-from-bracket" style="color: #dbdbdb;"></i><span aria-hidden="true" class=""></span> Log Out</li>'+
                      '</ul>'+
                    '</div>'+
                  '</div>'+
                '</li>'+
              '</ul>'+
            '</div>'
                )
                    
            }).catch(function() {
                console.log("Error al cargar los datos del user");
            });
    } else {
        console.log("No hay token disponible");
        $('.opc_CRUD').empty();
        $('.opc_exceptions').empty();
        $('#user_info').hide();
        $('.log-icon').empty();
        $('<a href="index.php?module=ctrl_login&op=login-register_view"><i id="col-ico" class="fa-solid fa-user fa-2xl"></i></a>').appendTo('.log-icon');
    }

}



$(document).ready(function() {

    load_menu();
    click_logout();
    click_cart();
});