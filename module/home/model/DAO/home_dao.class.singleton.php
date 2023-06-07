<?php

// require_once(MODEL_PATH . 'connect.php');

// include('C:\xampp\htdocs\FW_PHP_OO_MVC_jQuery_Guillem\model\connect.php');

    class home_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function select_data_carrusel($db) {
    
            $sql = "SELECT * FROM `brand` ORDER BY name_brand ASC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_category($db) {

            $sql = "SELECT * FROM category";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_data_type($db) {

            $sql = "SELECT *FROM type_motor ORDER BY cod_tmotor DESC";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_populars($db) {

            $sql= "SELECT * FROM `car` ORDER BY visits DESC LIMIT 30;";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

    }

?>