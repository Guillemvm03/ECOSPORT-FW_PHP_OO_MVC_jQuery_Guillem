<?php

    class cart_dao {
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function insert_car($db, $id_prod, $username) {
    
            $sql = "INSERT INTO cart ( id_car, username, quantity) VALUES ('$id_prod','$username', '1')";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_load_cart($db, $username) {
    
            $sql = "SELECT c.cod_prod ,cc.id_car, cc.stock, cc.price, cc.motor, cc.img_car, cc.gear_shift, m.id_brand, m.name_model, c.quantity  FROM cart c, car cc, model m, brand b WHERE c.id_car=cc.id_car AND m.id_model = cc.model AND m.id_brand = b.name_brand  AND username='$username'";
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        function delete_cart($db, $cod_prod, $username){
    
            $sql = "DELETE FROM cart WHERE username='$username' AND cod_prod='$cod_prod'";
            $stmt = $db -> ejecutar($sql);    
        }


        function update_qty($db,$cod_prod, $username, $qty){
          
            $sql = "UPDATE cart SET quantity = $qty WHERE username='$username' AND cod_prod='$cod_prod'";
            
            $stmt = $db -> ejecutar($sql);    
        }

        function select_checkout($db, $username, $data) {
            $date = date("Ymd");
            
            $sql = "INSERT INTO `orders`(`username`, `cod_prod`, `quantity`, `price`, `total_price`, `fecha`) VALUES ";
        
            foreach ($data as $fila) {
                $cod_prod = $fila["cod_prod"];
                $cantidad = $fila["quantity"];
                $precio = $fila["price"];
                $total_precio = $fila["price"] * $fila["quantity"];
        
                $sql .= "('$username','$cod_prod','$cantidad','$precio','$total_precio','$date'), ";
            }
        
            $sql = rtrim($sql, ', '); 
            $stmt = $db -> ejecutar($sql);
       
        }
        


        function delete_cart_check($db, $username){
    
            $sql = "DELETE FROM cart WHERE username='$username'";
            return $sql;
            
        }

    }

?>