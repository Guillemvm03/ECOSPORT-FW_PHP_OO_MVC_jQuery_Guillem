<?php
	class controller_cart {
		
		function view(){
			common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
		}
		
		function load_cart() {
            echo json_encode(common::load_model('cart_model', 'get_load_cart', [$_POST['token']]));		
        }

		function delete_cart() {
            echo json_encode(common::load_model('cart_model', 'get_delete_cart',  [$_POST['cod_prod'], $_POST['token']]));
        }

		function update_qty() {
            echo json_encode(common::load_model('cart_model', 'get_update_qty',  [$_POST['cod_prod'], $_POST['token'],$_POST['qty']]));
        }

		function checkout() {
            echo json_encode(common::load_model('cart_model', 'get_checkout',  [$_POST['token']]));
        }

	}