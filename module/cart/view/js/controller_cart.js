
function remove_cart(){
    $(document).on('click','.remove',function () {
     
      var token =  localStorage.getItem('token');
        var cod_prod = this.getAttribute('id');
        
        if(token == null){
          setTimeout(window.location.href = friendlyURL("?module=login") ,1000);
        }else{
            ajaxPromise(friendlyURL("?module=cart&op=delete_cart") , 'POST', 'JSON' , { 'cod_prod' : cod_prod , 'token' : token})
            .then(function(data) { 
              console.log(data);
              location.reload();
                // $('div.basket-product#'+ codigo_producto).empty();
            }).catch(function() {
                window.location.href = 'index.php?page=error503'
            });   
        }
    }); 
}

function change_qty(){
    $(document).on('input','.quantity-field',function () {
        
      var token =  localStorage.getItem('token');
        var cod_prod =  this.getAttribute('id');     
        var qty = $("#" + cod_prod + ".quantity-field").val();
        var stock =  this.getAttribute('id2');   

        if(token == null){
          setTimeout(window.location.href = friendlyURL("?module=login") ,1000);
        }else{

          if (qty < 1 ){

            toastr.warning("No puedes introducir un numero menor de 1");
            
          }else if(qty > stock){

            toastr.warning("No hay tantos coches en stock");

          }else{
            ajaxPromise(friendlyURL("?module=cart&op=update_qty") , 'POST', 'JSON' , { 'cod_prod' : cod_prod , 'token' : token, 'qty' : qty})
              .then(function(data) { 
                console.log(data);
                  location.reload();

                  
              }).catch(function() {
                  window.location.href = 'index.php?page=error503'
              });
          }
        }
    });
}

function checkout(){
    $(document).on('click','.checkout-cta',function () {

      var token =  localStorage.getItem('token');
        if(token == null){
          setTimeout(window.location.href = friendlyURL("?module=login") ,1000);
        }else{
            ajaxPromise(friendlyURL("?module=cart&op=checkout") , 'POST', 'JSON' , {'token' : token})
            .then(function(data) { 
              console.log(data);
          
                toastr.success("Checkout made succesfully");
                setTimeout(' window.location.href = friendlyURL("?module=home") ', 5000);
             
                            
            }).catch(function() {
                window.location.href = 'index.php?page=error503'
            });   
        }
    });
}

function load_cart(){




    var token =  localStorage.getItem('token');

    if(localStorage.getItem('token') == null){
        setTimeout(window.location.href = friendlyURL("?module=login") ,1000);
    }else{


          $('.div_search').hide();

        ajaxPromise(friendlyURL("?module=cart&op=load_cart") , 'POST', 'JSON' ,{ 'token' : token  })
        .then(function(data) { 


          var itemCount = Object.keys(data).length;



          $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.cart_header')
          .html(

            '<header class="container_cart">'+
            '<h1>Shopping Cart</h1>'+
            '<ul class="breadcrumb">'+
              '<li>Home</li>'+
              '<li>Shopping Cart</li>'+
            '</ul>'+
           '<span class="count">' + itemCount + ' items in the bag</span>' +

          '</header>'

          )
          var subtotal = 0;
          var total_price = 0;

          for (row in data) {
          //   console.log(data);

              $(".cart__products").append(

                  '<section class="container">'+
                  '<div v-if="products.length > 0">'+
                    '<ul class="products">'+
                    '<li class="row" v-for="(product, index) in products">'+
                      '<div class="col left">'+
                        '<div class="thumbnail">'+
                          '<a href="#">'+
                            '<img class="group list-group-imagee" src= "' + data[row].img_car + '"  alt="" width="200" heigth="150"  />'+
                          '</a>'+
                        '</div>'+
                        '<div class="detail">'+
                          '<div class="name"><a href="#">' + data[row].id_brand + ' ' + data[row].name_model +'</a></div>'+
                          '<div class="description">' + data[row].gear_shift +'</div>'+
                          '<div id="'+ data[row].cod_prod +'" class="subtotal">' + (data[row].price)*(data[row].quantity) + '$</div>'+
                        '</div>'+
                      '</div>'+
              
                      '<div class="col right">'+
                        '<div class="quantity">'+
                        '<span>'+data[row].quantity+'</span>'+
                          '<input  id="'+ data[row].cod_prod +'"  id2="'+data[row].stock+'" type="number" class="quantity-field" step="1" :value="' + data[row].quantity + '" min="1" @input="updateQuantity(index, $event)" @blur="checkQuantity(index, $event)" />'+
                        '</div>'+
                        '<div class="remove" id="'+ data[row].cod_prod +'">'+
                          '<svg @click="removeItem(index)" version="1.1" class="close"  xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"><polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"></polygon></svg>'+
                        '</div>'+
                      '</div>'+
                    '</li>'+
                  '</ul>'+
                  '</div>'+
                '</section>'


                 
                  
              )   
              var rowSubtotal = data[row].price * data[row].quantity;
              subtotal += rowSubtotal;
              total_price += rowSubtotal * 1.21;

          }    
          // console.log(total_price);

          document.getElementById("subtotal_element").textContent = 'SUBTOTAL '+subtotal + ' $';
          document.getElementById("total_element").textContent = 'TOTAL '+total_price + ' $';

          
        }).catch(function() {
            window.location.href = 'index.php?page=error503'
           
        });   
    }
}


$(document).ready(function(){
  

    remove_cart();
    change_qty();
    load_cart();
    checkout();

 
    
});