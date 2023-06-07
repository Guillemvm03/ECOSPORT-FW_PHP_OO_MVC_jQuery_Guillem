<?php



	class cart_bll {
		private $dao;
		private $db;
		static $_instance;

		function __construct() {
			$this -> dao = cart_dao::getInstance();
			$this -> db = db::getInstance();
		}

		public static function getInstance() {
			if (!(self::$_instance instanceof self)) {
				self::$_instance = new self();
			}
			return self::$_instance;
		}

		public function get_insert_car_BLL($args) {
			$token = explode('"', $args[1]);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> insert_car($this -> db, $args[0], $decode);
		}

		public function get_load_cart_BLL($args) {
	
			$token = explode('"', $args[0]);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> select_load_cart($this->db, $decode);
			
		}

		public function get_delete_cart_BLL($args) {
	
			$token = explode('"', $args[1]);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> delete_cart($this->db, $args[0], $decode);
			
		}

		public function get_update_qty_BLL($args) {
	
			$token = explode('"', $args[1]);
			$decode = middleware::decode_username($token[1]);
			return $this -> dao -> update_qty($this->db, $args[0], $decode, $args[2]);
			
		}

		public function get_checkout_BLL($args) {
			

				$token = explode('"', $args[0]);
				$decode = middleware::decode_username($token[1]);

			if(!empty($this -> dao -> select_load_cart($this->db, $decode))){
					
				$inf=$this -> dao -> select_load_cart($this->db, $decode);
					
			}
			$this -> dao -> select_checkout($this->db, $decode, $inf);
			
			return 'checkout_done';
			
		}


		
	}
?>