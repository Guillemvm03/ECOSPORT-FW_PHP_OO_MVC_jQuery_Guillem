

function loadCars(total_prod = 0, items_page = 3) {

    localStorage.removeItem('total_prod', total_prod);

    var filter = JSON.parse(localStorage.getItem('filter', filter));
    var id_cars = JSON.parse(localStorage.getItem('id_cars', id_cars));

    var brand_filter = JSON.parse(localStorage.getItem('brand_filter', brand_filter));
    var category_filter = JSON.parse(localStorage.getItem('category_filter', category_filter));
    var motor_filter = JSON.parse(localStorage.getItem('motor_filter', motor_filter));

    var id_car = localStorage.getItem('id_car', id_car);

    var filters_search = JSON.parse(localStorage.getItem('filters_search', filters_search));

    if (filter) {

        ajaxForSearch('?module=shop&op=filters', filter);

        // console.log(filter);
    } else if (brand_filter) {

        load_brand_filter(total_prod, items_page);

    } else if (category_filter) {
  
        load_category_filter(total_prod, items_page);
 
    } else if (motor_filter) {

        load_motor_filter(total_prod, items_page);
       
    } else if (id_car) {

        loadDetails(id_car);

    } else if (id_cars) {

        load_popular_detail();

    } else if (filters_search) {
        
        load_search();
        
    } else {

        ajaxForSearch('?module=shop&op=list', undefined, total_prod, items_page);

    }

}

function ajaxForSearch(url, filter, total_prod = 0, items_page) {

    if (total_prod != 0) {
        localStorage.setItem('total_prod', total_prod);
    } else {
        if (localStorage.getItem('total_prod')) {
            total_prod = localStorage.getItem('total_prod');
        } else {
            total_prod = 0;
        }
    }
    // console.log(total_prod, items_page);
    ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'filter': filter, 'total_prod': total_prod, 'items_page': items_page })
        .then(function (data) {
            console.log(data);

            $('.glider-prev').hide();
            $('.glider-next').hide();
            $('#map-details-1').hide();
            $("#containerShop").empty();

            $(".fa-regular fa-thumbs-up").hide();

            for (row in data) {

                $('<div></div>').appendTo('#containerShop')
                    .html(

                        '<div class="item col-xs-4 col-lg-4">' +
                        '<div class="thumbnail">' +
                        '<img class="group list-group-image" src="' + data[row].img_car + '" alt="" />' +
                        '<div class="caption">' +
                        '<div class="intents">' +
                        '<a class="list__heart" id="' + data[row].id_car + '">' +
                        '<i id="' + data[row].id_car + '" class="fa-sharp fa-solid fa-heart fa-beat"></i>' +
                        '</a>' +
                        '<span class="count"> 1,056 | </span>' +
                        '<i class="fa-solid fa-eye"></i>' +
                        '<span class="count">' + data[row].visits + '</span>' +
                        '</div>' +
                        '<h4 class="group inner list-group-item-heading">' + data[row].id_brand + ' ' + data[row].name_model + '<br />___<br>' + '</h4>' +
                        '<p class="group inner list-group-item-text">' + '$' + data[row].price + '</p>' +
                        '<div class="row">' +
                        '<div class="col-xs-12 col-md-6">' +
                        '<p class="lead">' + data[row].name_cat + '</p>' +
                        '</div>' +
                        '<div class="col-xs-12 col-md-6">' +
                        '<a class="more_info_list button add" id="' + data[row].id_car + '">Read More</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                    );
            }
            mapBox_all(data);
            load_likes_user();


        }).catch(function (e) {
            $("#containerShop").empty();
            $('<div></div>').appendTo('#containerShop').html('<h1>No hay coches con estos filtros</h1>');
        });
}

function clicks() {

    $(document).on("click", ".more_info_list", function () {
        var id_car = this.getAttribute('id');
        loadDetails(id_car);

    });

    //LIKES

    $(document).on("click", ".list__heart", function () {
        var id_car = this.getAttribute('id');
        click_like(id_car, "list_all");
    });


    $(document).on("click", ".details__heart", function () {
        // console.log('Holsaojd');
        var id_car = this.getAttribute('id');
        click_like(id_car, "details");
    });

    //

    $(document).on("click", ".details_cart_add", function () {

        var id_prod = this.getAttribute('id');
        add_cart(id_prod);
        // console.log(id_prod);
    });

}


function loadDetails(id_car) {

    var id_car_like = localStorage.getItem('id_car', id_car_like);

    if (id_car_like) {


        localStorage.removeItem('id_car');
        $('#pagination').empty();
    }

    ajaxPromise(friendlyURL("?module=shop&op=details_carousel"), 'POST', 'JSON', { 'id_car': id_car })
        .then(function (data) {
            console.log(data);

            $('#pagination').empty();
            $('#content_shop_cars').empty();
            // $('.date_car' && '.date_img').empty();
            $('#containerShop').empty();
            $('.div-filters').empty();
            $('#tyouilo').empty();
            $('.btn-group').empty();
            
            $('#map-details-1').show();


            for (row in data[1][0]) {
                $('<div></div>').attr({ 'id': data[1][0].id_img, class: 'date_img_dentro' }).appendTo('.date_img')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src= '" + data[1][0][row].img_cars + "'" + "</img>" +
                        "</div>"
                    )
            }

            $('<div></div>').attr({ 'id': data[0][0].id_car, class: 'date_car_dentro' }).appendTo('.date_car')
                .html(
                    "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                    "<h1><b>" + data[0][0].id_brand + " " + data[0][0].name_model + "</b></h1>" +
                    "<hr class=hr-shop>" +
                    "<table id='table-shop'> <tr>" +
                    "<td colspan=3> <i id='col-ico' class='fa-solid fa-road fa-2xl'></i> &nbsp;" + data[0][0].Km + "KM" + "</td>" +
                    "<td rowspan=> <i id='col-ico' class='fa-solid fa-person fa-2xl'></i> &nbsp;" + data[0][0].gear_shift + "</td>  </tr>" +
                    "<td colspan=3> <i id='col-ico' class='fa-solid fa-car fa-2xl'></i> &nbsp;" + data[0][0].name_cat + "</td>" +
                    "<td colspan=> <i id='col-ico' class='fa-solid fa-door-open fa-2xl'></i> &nbsp;" + data[0][0].num_doors + "</td>  </tr>" +
                    "<td colspan=3> <i id='col-ico' class='fa-solid fa-gas-pump fa-2xl'></i> &nbsp;" + data[0][0].name_tmotor + "</td>" +
                    "<td colspan=> <i id='col-ico' class='fa-solid fa-calendar-days fa-2xl'></i> &nbsp;" + data[0][0].matricualtion_date + "</td>  </tr>" +
                    "<td colspan=3> <i id='col-ico' class='fa-solid fa-palette fa-2xl'></i> &nbsp;" + data[0][0].color + "</td>" +
                    "<td colspan=> <i class='fa-solid fa-location-dot fa-2xl'></i> &nbsp;" + data[0][0].city + "</td> </tr>" +
                    "<h3><b>" + data[0][0].price + "$</b></h3>" +
                    "</table>" +
                    "<hr class=hr-shop>" +
                    "<h3><b>" + "More Information:" + "</b></h3>" +
                    "<b>This vehicle has a 2-year warranty and reviews during the first 6 months from its acquisition.</b>" +



                    "<div class='buttons_details'>" +




                    "<a class='details__heart' id='" + data[0][0].id_car + "'><i id=" + data[0][0].id_car + " class='fa-solid fa-heart fa-lg'></i> | </a>" +
                    "<a class='details_cart_add' id='" + data[0][0].id_car + "'><i id=" + data[0][0].id_car + " class='fa-solid fa-cart-shopping'></i></a>" +

                    "<div id='activity'>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"

                )

            // load_likes_user();

            new Glider(document.querySelector('.date_img'), {
                slidesToShow: 2,
                slidesToScroll: 2,
                draggable: true,
                dots: '.dots',
                arrows: {
                  prev: '.glider-prev',
                  next: '.glider-next'
                }
              });
              more_cars_related(data[0][0].motor);
              mapBox(data[0][0]);


        }).catch(function () {
            // window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Load_Details SHOP";
        });


}

function print_filters() {
    $('<div class="div-filters"></div>').appendTo('.filters')
        .html(
            '<select class="filter_type">' +
        
            '<option value="all_t">All type</option>' +
            '<option value="E">Electric</option>' +
            '<option value="H">Hybrid</option>' +
            '<option value="A">Adapted</option>' +
            '<option value="G">Gasoline</option>' +
            '</select>' +
            '<select class="filter_category">' +
            '<option value="all_c">All categorys</option>' +
            '<option value="1">Km0</option>' +
            '<option value="2">Second Hand</option>' +
            '<option value="3">Renting</option>' +
            '<option value="4">Pre-Owned</option>' +
            '<option value="5">Offer</option>' +
            '<option value="6">New</option>' +
            '</select>' +
            '<select class="filter_model">' +
            '<option value="all_m">All models </option>' +
            '<option value="1">A1 </option>' +
            '<option value="2">Q5 </option>' +
            '<option value="3">TT </option>' +
            '<option value="4">A3 </option>' +
            '<option value="5">A7 </option>' +
            '<option value="6">Serie3 </option>' +
            '<option value="7">x5 </option>' +
            '<option value="8">x6 </option>' +
            '<option value="9">Clase A </option>' +
            '<option value="10">Clase C </option>' +
            '<option value="11">Clase G </option>' +
            '<option value="12">GLE </option>' +
            '<option value="13">Leon </option>' +
            '<option value="14">Ibiza </option>' +
            '<option value="15"> Tucson </option>' +
            '<option value="16">i30 </option>' +
            '<option value="17">Ranger </option>' +
            '<option value="18">Focus </option>' +
            '<option value="19">Cooper </option>' +
            '<option value="20">Vitara </option>' +
            '</select>' +
            '<select class="filter_order">' +
            '<option value="all_m">Order by </option>' +
            '<option value="price">Precio de mas a menos </option>' +
            '<option value="km">KM de menos a mas </option>' +
            '</select>' +
            '<div id="overlay">' +
            '<div class= "cv-spinner" >' +
            '<span class="spinner"></span>' +
            '</div >' +
            '</div > ' +
            '</div>' +
            '</div>' +
            '<p> </p>'+
            '</br>'+
            '<button class="filter_button button_spinner" id="Button_filter">Filter</button>' +
            '<button class="filter_remove" id="Remove_filter">Remove</button>'
        );

        
}


function filter_button() {
    // Filtro type
    $(function () {
        $('.filter_type').change(function () {
            localStorage.setItem('filter_type', this.value);
        });
        if (localStorage.getItem('filter_type')) {
            $('.filter_type').val(localStorage.getItem('filter_type'));
        }
    });

    //  Filtro category
    $(function () {
        $('.filter_category').change(function () {
            localStorage.setItem('filter_category', this.value);
        });
        if (localStorage.getItem('filter_category')) {
            $('.filter_category').val(localStorage.getItem('filter_category'));
        }
    });


    //  Filtro model
    $(function () {
        $('.filter_model').change(function () {
            localStorage.setItem('filter_model', this.value);
        });
        if (localStorage.getItem('filter_model')) {
            $('.filter_model').val(localStorage.getItem('filter_model'));
        }
    });

    // Filtro type
    $(function () {
        $('.filter_brand').change(function () {
            localStorage.setItem('filter_brand', this.value);
        });
        if (localStorage.getItem('filter_brand')) {
            $('.filter_brand').val(localStorage.getItem('filter_brand'));
        }
    });


    //order
    $(function () {
        $('.filter_order').change(function () {
            localStorage.setItem('filter_order', this.value);
        });
        if (localStorage.getItem('filter_order')) {
            $('.filter_order').val(localStorage.getItem('filter_order'));
        }
    });




    //    // Filtro de km
    //     $(function () {
    //         $('.filter_order').change(function () {
    //             localStorage.setItem('filter_order', this.value);
    //         });
    //         if (localStorage.getItem('filter_order')) {
    //             $('.filter_order').val(localStorage.getItem('filter_order'));
    //         }
    //     });

    $(document).on('click', '.filter_button', function () {
        var filter = [];

        if (localStorage.getItem('filter_type')) {
            filter.push(['motor', localStorage.getItem('filter_type')])
        }

        if (localStorage.getItem('filter_category')) {
            filter.push(['category', localStorage.getItem('filter_category')])
        }

        if (localStorage.getItem('filter_model')) {
            filter.push(['model', localStorage.getItem('filter_model')])
        }

        if (localStorage.getItem('filter_order')) {
            filter.push(['orden', localStorage.getItem('filter_order')])
        }


        // if (localStorage.getItem('filter_brand')) {
        //     filter.push(['brand', localStorage.getItem('filter_brand')])
        // }
        // localStorage.setItem('filter', filter);
        
        localStorage.setItem('filter', JSON.stringify(filter));
        // console.log( JSON.stringify(filter));

        if (filter) {
            ajaxForSearch("?module=shop&op=filters", filter);
            // console.log(filter);
        }
        else {
            ajaxForSearch("?module=shop&op=list");
        }
        // highlight(filter);

        // $(document).on('click', '.filter_remove', function () {
        //     localStorage.removeItem('filter_type');
        //     localStorage.removeItem('filter_category');
        //     filter.length = 0;
        //     if (filter == 0) {
        //         ajaxForSearch("modules/shop/crtl/crtl_shop.php?op=shopAll");
        //         highlight(filter);
        //     }
        // });
    });
}

function load_details() {
    $(document).on('click', '.link', function () {
        var id = this.getAttribute('id');
        details(id);
    })
}

function remove_filters() {
    $(document).on('click', '.filter_remove', function () {

        localStorage.removeItem('filter');
        localStorage.removeItem('filter_type');
        localStorage.removeItem('filter_category');
        localStorage.removeItem('filter_model');
        localStorage.removeItem('brand_filter');
        localStorage.removeItem('category_filter');
        localStorage.removeItem('motor_filter');
        localStorage.removeItem('filters_search');
        localStorage.removeItem('filter_order');


        location.reload();
    });
}

//MAP

function mapBox_all(data) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-0.61667, 38.83966492354664], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<h3 style="text-align:center;">' + data[row].model + '</h3><p style="text-align:center;">Modelo: <b>' + data[row].model + '</b></p>' +
            '<p style="text-align:center;">Precio: <b>' + data[row].price + '€</b></p>' +
            '<img src=" ' + data[row].img_car + '" width="200" height="150" />' +
            '<a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall more_info_list" data-wow-delay=".4s" id="' + data[row].id_car + '">Read More</a>')
        marker.setPopup(minPopup)
            .setLngLat([data[row].lon, data[row].lat])
            .addTo(map);
    }
}

function mapBox(id) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [id.lon, id.lat], // starting position [lng, lat]
        zoom: 10 // starting zoom
    });
    const markerOntinyent = new mapboxgl.Marker()
    const minPopup = new mapboxgl.Popup()
    minPopup.setHTML('<h4>' + id.brand_name + '</h4><p>Modelo: ' + id.model + '</p>' +
        '<p>Precio: ' + id.price + '€</p>' +
        '<img class="imgdetailsmap" src=" ' + id.img_car + '"/>')
    markerOntinyent.setPopup(minPopup)
        .setLngLat([id.lon, id.lat])
        .addTo(map);
}

//

function load_search() {
    var filters_search = JSON.parse(localStorage.getItem('filters_search'));
    ajaxPromise(friendlyURL("?module=shop&op=filters_search"), 'POST', 'JSON', { 'filters_search': filters_search })
        .then(function (data) {

            //  window.location.href = friendlyURL("?module=shop");
            console.log(data);
            $("#containerShop").empty();
            $('.glider-prev').hide();
            $('.glider-next').hide();

            for (row in data) {
                $('<div></div>').appendTo('#containerShop')
                    .html(
                        '<div class="item col-xs-4 col-lg-4">' +
                        '<div class="thumbnail">' +
                        '<img class="group list-group-image" src="' + data[row].img_car + '" alt="" />' +
                        '<div class="caption">' +
                        '<div class="intents">' +
                        '<a class="list__heart" id="' + data[row].id_car + '">' +
                        '<i id="' + data[row].id_car + '" class="fa-solid fa-heart fa-lg"></i>' +
                        '</a>' +
                        '<span class="count"> 1,056 | </span>' +
                        '<i class="fa-solid fa-eye"></i>' +
                        '<span class="count">' + data[row].visits + '</span>' +
                        '</div>' +
                        '<h4 class="group inner list-group-item-heading">' + data[row].id_brand + ' ' + data[row].name_model + '<br />___<br>' + '</h4>' +
                        '<p class="group inner list-group-item-text">' + '$' + data[row].price + '</p>' +
                        '<div class="row">' +
                        '<div class="col-xs-12 col-md-6">' +
                        '<p class="lead">' + data[row].name_cat + '</p>' +
                        '</div>' +
                        '<div class="col-xs-12 col-md-6">' +
                        '<a class="more_info_list button add" id="' + data[row].id_car + '">Read More</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'

                );
            }
           
            // location.reload();
            mapBox_all(data);
        }).catch(function () {
            $("#containerShop").empty();
            $('<div></div>').appendTo('#containerShop')
                .html('<h1>No hay coches con estos filtros</h1>');
        });
}

function load_jump(durl, filter1) {
    // console.log(durl);
    // var filter1 = JSON.parse(localStorage.getItem('filter1'));
    ajaxPromise(durl, 'POST', 'JSON', { 'filter1': filter1 })

        .then(function (data) {
            // console.log(data);
            $("#containerShop").empty();
            for (row in data) {
                $('<div></div>').appendTo('#containerShop')
                    .html(

                        // '<div id="products" class="row list-group">'+
                        '<div class="item  col-xs-4 col-lg-4">' +
                        ' <div class="thumbnail">' +
                        '<img class="group list-group-image" src= "' + data[row].img_car + '"  alt="" />' +
                        '<div class="caption">' +
                        '<h4 class="group inner list-group-item-heading"> ' + 'Model:' + data[row].model + '</h4>' +
                        // '<div id="div-map">'+
                        // '<div id="map"></div>'+
                        '<p class="group inner list-group-item-text">' + 'Category:' + data[row].category + '</p>' +
                        '<div class="row">' +
                        '<div class="col-xs-12 col-md-6">' +
                        '<p class="lead">' + 'Price:' + data[row].price + '€</p>' +
                        '</div>' +
                        ' <div class="col-xs-12 col-md-6">' +
                        // '<a class="btn btn-success id="' + data[row].id_car + '">Add to cart</a>'+
                        // '<a class="more_info_list button  id="' + data[row].id_car + '">Read More</a>'+
                        '<a class="more_info_list button add" id="' + data[row].id_car + '">Read More</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        ' </div> '

                    );
            }
            mapBox_all(data);

        }).catch(function (e) {
            $("#containerShop").empty();
            $('<div></div>').appendTo('#containerShop').html('<h1>No hay coches con estos filtros</h1>');
        });
}

//LOAD-HOME

function load_brand_filter(total_prod = 0, items_page = 3) {

    var array_brand = JSON.parse(localStorage.getItem('brand_filter'));
    var brand = array_brand[0].brand[0];
    // console.log(brand);
    ajaxForSearch("?module=shop&op=home_filter", brand, total_prod, items_page);

}

function load_category_filter(total_prod = 0, items_page = 3) {
    // console.log("soy los category filtros");

    var array_category = JSON.parse(localStorage.getItem('category_filter'));
    var category = array_category[0].category[0];

    // console.log(category);

    ajaxForSearch('?module=shop&op=filters' , category, total_prod, items_page);
}

function load_motor_filter(total_prod = 0, items_page = 3) {
   
    var array_tmotor = JSON.parse(localStorage.getItem('motor_filter'));
    var type_motor = array_tmotor[0].type_motor[0];

    ajaxForSearch("?module=shop&op=home_filter", type_motor, total_prod, items_page);
    // console.log(type_motor);
}

function load_popular_detail() {
    var array_id_cars = JSON.parse(localStorage.getItem('id_cars'));
    var id_cars = array_id_cars[0].id_cars[0];

    loadDetails(id_cars);


}


// RELATED-SHOP

function cars_related(loadeds = 0, type_car, total_items) {
    let items = 3;
    let loaded = loadeds;
    let type = type_car;
    let total_item = total_items;



    ajaxPromise(friendlyURL("?module=shop&op=cars_related"), 'POST', 'JSON', { 'type': type, 'loaded': loaded, 'items': items })
        .then(function (data) {
            console.log(data);



            if (loaded == 0) {
                $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.results')
                    .html(
                        '<section class="sec bg-light">' +
                        '<div class="container">' +
                        '<div class="row">' +
                        '<div class="col-sm-12 title_bx">' +
                        '<h3 class="title"> You may also Like   </h3>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-md-12 list-slider mt-4">' +
                        '<div class="owl-carousel common_wd  owl-theme" id="recent_post">' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</section>'

                    )
                for (row in data) {
                    if (data[row].id_car != undefined) {
                        $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                
                                '<div class="item">' +
                                '<div class="sq_box shadow">' +
                                '<div class="pdis_img"> ' +
                                '<span class="wishlist">' +
                                '<a alt="Add to Wish List" title="Add to Wish List" href="javascript:void(0);"> <i class="fa fa-heart"></i></a>' +
                                '</span>' +
                                '<a href="#">' +
                                "<img src = " + data[row].img_car + " alt='imagen car' </img> " +
                                '</a>' +
                                '</div>' +
                                '<h4 class="mb-1"> <a href="details.php">' + data[row].id_brand + "  " + data[row].name_model + '</a> </h4>' +
                                '<div class="price-box mb-2">' +
                                // '<span class="price"> Price <i class="fa fa-inr"></i> 200 </span>'+
                                '<span class="offer-price">  Price <i class="">$</i> ' + data[row].price + ' </span>' +
                                '</div>' +
                                '<div class="btn-box text-center">' +
                                '<a class="btn btn-sm" href="javascript:void(0);"> <i class="fa fa-shopping-cart"></i> Add to Cart </a>' +
                                '</div>' +
                                '</div>' +
                                '</div>'



                            )
                    }
                }
                $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                    .html(
                        '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                    )
            }
            if (loaded >= 3) {
                for (row in data) {
                    if (data[row].id_car != undefined) {
                        console.log(data);
                        $('<div></div>').attr({ 'id': data[row].id_car, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                "<li class='portfolio-item'>" +
                                "<div class='item-main'>" +
                                "<div class='portfolio-image'>" +
                                "<img src = " + data[row].img_car + " alt='imagen car' </img> " +
                                "</div>" +
                                "<h5>" + data[row].id_brand + "  " + data[row].name_model + "</h5>" +
                                "</div>" +
                                "</li>"

                            )
                    }
                }
                var total_cars = total_item - 3;
                if (total_cars <= loaded) {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            "</br><button class='btn-notexist' id='btn-notexist'></button>"
                        )
                } else {
                    $('.more_car__button').empty();
                    $('<div></div>').attr({ 'id': 'more_car__button', 'class': 'more_car__button' }).appendTo('.title_content')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function () {
            console.log("error cars_related");
        });
}


function more_cars_related(type_car) {
    var items = 0;
    ajaxPromise(friendlyURL("?module=shop&op=count_cars_related"), 'POST', 'JSON', { 'type_car': type_car })
        .then(function (data) {
            // console.log(data);
            var total_items = data[0].n_prod;
            cars_related(0, type_car, total_items);
            $(document).on("click", '.load_more_button', function() {
                items = items + 3;
                $('.more_car__button').empty();
                cars_related(items, type_car, total_items);
            });
        }).catch(function () {
            console.log('error total_items');
        });
}


function pagination() {


    var filters_search = JSON.parse(localStorage.getItem('filters_search'));
    // var filtros = JSON.parse(localStorage.getItem('filter'));
    // var filter = filter

    // if (filtros) {
    //     var url = "modules/shop/crtl/crtl_shop.php?op=count_home";
    // } else if (filter != undefined) {
    //     var url = "modules/shop/crtl/crtl_shop.php?op=count_filters";
    // } else {
    //     var url = "modules/shop/crtl/crtl_shop.php?op=count";
    // }

    // var brand_filter = JSON.parse(localStorage.getItem('brand_filter', brand_filter));

    // if (brand_filter) {

    //     var array_brand = JSON.parse(localStorage.getItem('brand_filter'));
    //     var brand = array_brand[0].brand[0];

    //     var url = "?module=shop&op=home_filter" + brand;

    // } else {

    // if(filters_search){

    //     var url = "?module=shop&op=count_search";

    // }else{

        var url = "?module=shop&op=count";
    // }
    // ajaxPromise(friendlyURL(url), 'POST', 'JSON', { 'brand_filter': brand_filter })
    ajaxPromise(friendlyURL(url), 'POST', 'JSON', {})
        .then(function (data) {
            // console.log(data);

            var total_prod = data[0].contador;

            if (total_prod >= 3) {
                total_pages = Math.ceil(total_prod / 3)
            } else {
                total_pages = 1;
            }


            $('#pagination').bootpag({
                total: total_pages,
                page: 1,
                maxVisible: total_pages

            }).on('page', function (event, num) {
                total_prod = 3 * (num - 1);
                console.log(total_prod);
                localStorage.setItem('total_prod', total_prod);
                loadCars(total_prod, 3);

            });


        })
}


function click_like(id_car, lugar) {
    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL("?module=shop&op=control_likes"), 'POST', 'JSON', { 'id_car': id_car, 'token': token })
            .then(function (data) {
                console.log(data);

                if(data == 'like'){
                    $("#" + id_car + ".fa-heart").css('color', '#ff0000');
                }else if(data == 'unlike'){
                    $("#" + id_car + ".fa-heart").css('color', '#213454');
                }
                   
                    


                
                // $("#" + id_car + ".fa-heart").toggleClass('like_red');
                // $("#" + id_car + ".fa-solid fa-heart fa-lg").toggleClass('fa-regular fa-heart');
                
            }).catch(function () {
                window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function click_like SHOP";
            });

    } else {
        const redirect = [];
        redirect.push(id_car, lugar);

        localStorage.setItem('redirect_like', redirect);
        localStorage.setItem('id_car', id_car);

        toastr.warning("Debes de iniciar session");
        setTimeout( 'window.location.href = friendlyURL("?module=login") ,3000');
    }
}

function load_likes_user() {

    var token = localStorage.getItem('token');
    if (token) {
        ajaxPromise(friendlyURL("?module=shop&op=load_likes"), 'POST', 'JSON', { 'token': token })
            .then(function (data) {
                console.log(data);
                for (row in data) {
                    
                  
                        $("#" + data[row].id_car + ".fa-heart").css('color', '#ff0000');
                   
                }
            }).catch(function () {
                window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Function load_like_user SHOP";
            });
    }
    // console.log(token);
}


function add_cart(id_prod){

        
        // var codigo_producto = id_prod;
        var token = localStorage.getItem('token');
    
        if(token == null){
            setTimeout( window.location.href = friendlyURL("?module=login") ,1000);
        }else{
            ajaxPromise(friendlyURL("?module=shop&op=insert_cart") , 'POST', 'JSON', { 'id_prod': id_prod, 'token': token })
            .then(function(data) {    
                console.log(data);
                location.reload();

                // $("#" + id_prod + ".fa-heart").toggleClass('like_red');
            }).catch(function() {
                window.location.href = 'index.php?page=error503'
            });   
        }
    }

$(document).ready(function () {
    // load_details();
    loadCars();
    clicks();
    print_filters();
    filter_button();
    remove_filters();
    pagination();
    $('#list').click(function (event) { event.preventDefault(); $('#products .item').addClass('list-group-item'); });
    $('#grid').click(function (event) { event.preventDefault(); $('#products .item').removeClass('list-group-item'); $('#products .item').addClass('grid-group-item'); });
});



    //

