
// Función para cargar el carrusel de marcas
function carousel_Brands() {
  ajaxPromise(friendlyURL("?module=home&op=carrusel"), 'POST', 'JSON')
    .then(function(data) {
      // Crear elementos HTML para cada marca en el carrusel
      for (row in data) {
        $('<div></div>').attr('class', "carousel__elements").attr('id', data[row].name_brand).appendTo(".carousel__list").html(
          "<div class='brand33'>" +
          "<div class='shrink'>" +
          "<img class='carousel__img' id='' src='" + data[row].img_brand + "' alt='foto' >" +
          "</div>" +
          " <span>" + data[row].name_brand + "</span> " +
          "</div>"
        )
      }

      // Inicializar el carrusel utilizando la biblioteca Glider
      new Glider(document.querySelector('.carousel__list'), {
        slidesToShow: 5,
        slidesToScroll: 5,
        draggable: true,
        dots: '.dots',
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
    })
    .catch(function() {
      // Redireccionar en caso de error
      // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Carrusel_Brands HOME";
    });
}

// Función para cargar las categorías
function loadCategories() {
  ajaxPromise(friendlyURL("?module=home&op=category"), 'POST', 'JSON')
    .then(function(data) {
      // Crear elementos HTML para cada categoría
      for (row in data) {
        $('<div></div>').attr('class', "div_cate").attr({ 'id': data[row].id_cat }).appendTo('#containerCategories')
          .html(
            '<h3 class="title-cat">'+data[row].name_cat+'</h3>'+
            '<div id="box-cat">'+
            '<img class="content-cat-image" src=' + data[row].img_cat + ' alt="" >'+
              '<div id="overlay-cat">'+
              
                '<span id="plus-cat">'+data[row].description+'</span>'+
              '</div>'+
              
            '</div>'
          )
      }
    }).catch(function() {
      // Redireccionar en caso de error
      // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

// Función para cargar los tipos de motores
function loadCatTypes() {
  ajaxPromise(friendlyURL("?module=home&op=type"), 'POST', 'JSON')
    .then(function(data) {
      // Crear elementos HTML para cada tipo de motor
      for (row in data) {
        $('<div></div>').attr('class', "div_motor").attr({ 'id': data[row].cod_tmotor }).appendTo('#cards-list2')
          .html(
            "<li class='card2'>" +
            "<div class='card_title2'>" +
            "<div class='card_image2'>" +
            "<img src = " + data[row].img_tmotor + " alt='foto'" +
            "</div>" +
            "<h5 class='letra_cat1'>" + data[row].name_tmotor + "</h5>" +
            "</div>" +
            "</li>"
          )
      }
  
   }).catch(function() {
     //  window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
   });
}

//POPULAR-MOST-VISITED

// Esta función carga elementos populares en la página
function loadPopulares() {
    // Realiza una solicitud AJAX para obtener datos populares
    ajaxPromise(friendlyURL("?module=home&op=populars"), 'POST', 'JSON')
      .then(function(data) {
     
        // Itera sobre cada elemento en los datos
        for (row in data) {
          // Crea un nuevo elemento <div> con la clase "div_popular" y un ID basado en los datos

          $('<div></div>').attr('class', "div_popular").attr({ 'id': data[row].id_car }).appendTo('.popular1')
            .html(
              "<div class='brand33'>" +
              "<img class='carousel__img' id='' src='" + data[row].img_car + "' alt='foto' >" +
              " <span>" + data[row].model + "</span> " +
              "</div>"
            );
        }
  
        // Crea un carrusel de elementos populares utilizando la biblioteca Glider
        new Glider(document.querySelector('.popular1'), {
          slidesToShow: 5,
          slidesToScroll: 5,
          draggable: true,
          dots: '.dots',
          arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
          }
        });
  
      }).catch(function() {
        // Si la solicitud AJAX falla, redirige a otra página
        // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Types_car HOME";
      });
  }

//CLICK-HOME-SHOP

function clicks() {

 // Elimina ciertos elementos del almacenamiento local al iniciar
 localStorage.removeItem('filter');
 localStorage.removeItem('brand_filter');
 localStorage.removeItem('motor_filter');
 localStorage.removeItem('category_filter');
//  localStorage.removeItem('filters_search');
 localStorage.removeItem('id_cars');

 // Maneja el evento de clic en elementos con la clase "carousel__elements"
 $(document).on("click", 'div.carousel__elements', function() {
   var brand_filter = [];
   brand_filter.push({ "brand": [this.getAttribute('id')] });
   // Elimina ciertos elementos del almacenamiento local
   localStorage.removeItem('filter');
   localStorage.removeItem('filter_model');
   localStorage.removeItem('filter_type');
   localStorage.removeItem('filter_category');
   // Guarda el filtro de marca en el almacenamiento local
   localStorage.setItem('brand_filter', JSON.stringify(brand_filter));

   setTimeout(function() {
     // Redirige a otra página después de 300 milisegundos
     window.location.href = friendlyURL("?module=shop");
   }, 300);
 });

 // Maneja el evento de clic en elementos con la clase "div_cate"
 $(document).on("click", '.div_cate', function() {
   var category_filter = [];
   category_filter.push({ "category": [this.getAttribute('id')] });
   // Elimina ciertos elementos del almacenamiento local
   localStorage.removeItem('filter');
   localStorage.removeItem('filter_model');
   localStorage.removeItem('filter_type');
   localStorage.removeItem('filter_category');
   // Guarda el filtro de categoría en el almacenamiento local
   localStorage.setItem('category_filter', JSON.stringify(category_filter));

   setTimeout(function() {
     // Redirige a otra página después de 300 milisegundos
     window.location.href = friendlyURL("?module=shop");
   }, 300);
 });

 // Maneja el evento de clic en elementos con la clase "div_motor"
 $(document).on("click", '.div_motor', function() {
   var motor_filter = [];
   motor_filter.push({ "type_motor": [this.getAttribute('id')] });
   // Elimina ciertos elementos del almacenamiento local
   localStorage.removeItem('filter');
   localStorage.removeItem('filter_model');
   localStorage.removeItem('filter_type');
   localStorage.removeItem('filter_category');
   // Guarda el filtro de tipo de motor en el almacenamiento local
   localStorage.setItem('motor_filter', JSON.stringify(motor_filter));
   setTimeout(function() {
     // Redirige a otra página después de 300 milisegundos
     window.location.href = friendlyURL("?module=shop");
   }, 300);
 });

 // Maneja el evento de clic en elementos con la clase "div_popular"
 $(document).on("click", '.div_popular', function() {
   var id_cars = [];
   id_cars.push({ "id_cars": [this.getAttribute('id')] });
   // Guarda el ID del elemento en el almacenamiento local
   localStorage.setItem('id_cars', JSON.stringify(id_cars));
   setTimeout(function() {
     // Redirige a otra página después de 300 milisegundos
     window.location.href = 'friendlyURL("?module=shop")';
   }, 300);
 });

$(document).on("click", '.col-md-7', function() {
 
 setTimeout(function() {
   window.location.href = friendlyURL("?module=shop");
}, 300);
 
});


}

//API BOOK

function loadsuggestions() {
  var limit = 2;

  $(document).on("click", '.cta', function() {
    $('#featured').empty();
    $('#btnfeatured').empty();
    limit = limit + 2;

    ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=car', 'GET', 'JSON')
      .then(function(data) {
        var DatosJson = JSON.parse(JSON.stringify(data));
        DatosJson.items.length = limit;

        for (i = 0; i < DatosJson.items.length; i++) {
          $('<div id="prueba"></div>').appendTo('#featured').html(
            // "<div class='tit_rev'>"+
            // "<h1>Revistas</h1>"+
            // "</div>"+
            "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories'] + "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div>" +
            '<textarea rows="10">' + data['items'][i]['volumeInfo']['description'] + '</textarea>' +
            '<br>' +
            '<br>' +
            '<br>' +
            '<a target="_blank" href="' + data['items'][i]['accessInfo']['webReaderLink'] + '" class="cta_search">' +
            '<span>Show info</span>' +
            '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
            '<path d="M1,5 L11,5"></path>' +
            '<polyline points="8 1 12 5 8 9"></polyline>' +
            '</svg>' +
            '</a>'
          );
        }
        $("#btnfeatured").append(
          '<button class="cta">' +
          '<span>Show 2 more</span>' +
          '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
          '<path d="M1,5 L11,5"></path>' +
          '<polyline points="8 1 12 5 8 9"></polyline>' +
          '</svg>' +
          '</button>'
        );
        if (limit === 10) {
          $('#btnfeatured').empty();
          $("#nomore").append(
            '<div id="loadsugest"><a>NO HAY MAS LIBROS</a></div>'
          );
        }
      });
  });
}

function getSuggestions() {
  limit = 2;
  ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=car', 'GET', 'JSON')
    .then(function(data) {
      var DatosJson = JSON.parse(JSON.stringify(data));
      DatosJson.items.length = limit;

      for (i = 0; i < DatosJson.items.length; i++) {
        $('<div id="prueba"></div>').appendTo('#featured').html(
          "<br><div id='cont_img'><img src='" + data['items'][i]['volumeInfo']['imageLinks']['thumbnail'] + "' class='cart' cat='" + data['items'][i]['volumeInfo']['categories']+ "' data-toggle='modal' data-target='#exampleModal'></div><div id='list_header'><span id='li_brand'>  " + DatosJson.items[i].volumeInfo.title + "</br>" + "</span></div>" +
          '<textarea rows="10">' + data['items'][i]['volumeInfo']['description'] + '</textarea>' +
          '<br>' +
          '<br>' +
          '<br>' +
          '<a target="_blank" href="' + data['items'][i]['accessInfo']['webReaderLink'] + '" class="cta_search">' +
          '<span>Show info</span>' +
          '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
          '<path d="M1,5 L11,5"></path>' +
          '<polyline points="8 1 12 5 8 9"></polyline>' +
          '</svg>' +
          '</a>'
        );
      }
      $("#featured").append(
        '<br>' +
        '<br>' +
        '<br>' +
        '<button class="cta">' +
        '<span>Show 2 more</span>' +
        '<svg width="15px" height="10px" viewBox="0 0 13 10">' +
        '<path d="M1,5 L11,5"></path>' +
        '<polyline points="8 1 12 5 8 9"></polyline>' +
        '</svg>' +
        '</button>'
      );
    });
  loadsuggestions();
}

$(document).ready(function() {
  // loadContentModal();
  carousel_Brands();
  loadCategories();
  loadCatTypes();
  clicks();
  loadPopulares();
  getSuggestions();
});
