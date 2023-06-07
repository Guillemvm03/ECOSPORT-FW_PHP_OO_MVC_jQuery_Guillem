<?php
    class controller_shop {

        function view() {
            // echo 'Hola';
            common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
        }

        function list() {
            echo json_encode(common::load_model('shop_model', 'get_list', [$_POST['total_prod'], $_POST['items_page']]));
        
        }
        
        function details_carousel() {
            echo json_encode(common::load_model('shop_model', 'get_details_carousel', $_POST['id_car']));

        }
        
        function filters() {
            echo json_encode(common::load_model('shop_model', 'get_filters', [$_POST['filter']]));
            
        }
        
        function filters_search() {
            
            echo json_encode(common::load_model('shop_model', 'get_filters_search', $_POST['filters_search']));
            // [$_POST['orderby'], $_POST['total_prod'],$_POST['items_page'], $_POST['filters']]));
        }

        function most_visit() {
            echo json_encode(common::load_model('shop_model', 'get_most_visit_BLL', $_POST['id']));
        }

        function count() {
            
            echo json_encode(common::load_model('shop_model', 'get_count'));
        }


        function count_search() {
            
            echo json_encode(common::load_model('shop_model', 'get_count_search'));
        }

        function count_filters() {
            echo json_encode(common::load_model('shop_model', 'get_count_filters'));
           
        }

        function cars() {
          
            echo json_encode(common::load_model('shop_model', 'get_cars', [$_POST['category'], $_POST['type'], $_POST['id'], $_POST['loaded'], $_POST['items']]));
        }

        function load_likes() {
           
            echo json_encode(common::load_model('shop_model', 'get_load_likes', $_POST['token']));
        }

        function control_likes() {
          
            echo json_encode(common::load_model('shop_model', 'get_control_likes', [$_POST['id_car'], $_POST['token']]));
        }

        function count_cars_related() {

            echo json_encode(common::load_model('shop_model', 'get_count_cars_related', $_POST['type_car']));
            
           
        }

        function cars_related() {

            echo json_encode(common::load_model('shop_model', 'get_cars_related',  [$_POST['type'], $_POST['loaded'], $_POST['items']]));
       
           
        }

        function home_filter() {

            echo json_encode(common::load_model('shop_model', 'get_home_filter',  [$_POST['filter'], $_POST['total_prod'], $_POST['items_page']]));
            // echo json_encode([$_POST['filter']]);
           
        }

        function insert_cart() {

            echo json_encode(common::load_model('shop_model', 'get_insert_car',  [$_POST['id_prod'], $_POST['token']]));
            // echo json_encode([$_POST['token']]);
           
        }

        
    }
?>
