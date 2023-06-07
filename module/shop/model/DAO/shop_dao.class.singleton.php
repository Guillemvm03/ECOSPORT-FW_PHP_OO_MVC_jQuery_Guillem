<?php
    class shop_dao {
        static $_instance;
        
        private function __construct() {
        }
        
        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        public function select_all_cars($db, $total_prod, $items_page) {

            $sql = "SELECT * 
            FROM car c, model m, category cc
            WHERE c.model = m.id_model AND c.category = cc.id_cat 
            ORDER BY c.visits DESC
            LIMIT $total_prod, $items_page";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        function select_details($db, $id){

            $sql = "SELECT *
            FROM car c, model m, type_motor t, category ca
            WHERE c.id_car = '$id'
            AND  c.model = m.id_model 
            AND c.category = ca.id_cat
            AND c.motor = t.cod_tmotor";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_details_images($db, $id){

            $details = self::select_details($db, $id);
            $sql = "SELECT i.id_car, i.img_cars
            FROM img_cars i
            WHERE i.id_car = '$id'";

            $stmt = $db->ejecutar($sql);
            
            $array = array();
            
            if (mysqli_num_rows($stmt) > 0) {
                foreach ($stmt as $row) {
                    array_push($array, $row);
                }
            }

            $rdo = array();
            $rdo[0] = $details;
            $rdo[1][] = $array;

            return $rdo;
            
        }


        function select_filters($db,$filter){
            
           
            $sql = "SELECT DISTINCT c.*
            FROM car c INNER JOIN img_cars i INNER JOIN category ca INNER JOIN type_motor t INNER JOIN model m 
            ON c.id_car = i.id_car AND ca.id_cat = c.category AND t.cod_tmotor = c.motor AND m.id_model = c.model AND c.img_car = i.img_cars";
                 
                
                
                  for ($i=0; $i < count($filter[0]); $i++){
                      
                      if ($i==0){
                        if ($filter[0][$i][0] == 'orden'){
                           
                            $sql.= " ORDER BY " . $filter[0][$i][1] . " ASC";

                        }else{
                          $sql.= " WHERE c." . $filter[0][$i][0] . "= '" . $filter[0][$i][1]."'";
                      
                        }
                      }else {
                        if ($filter[0][$i][0] == 'orden'){
                           
                            $sql.= " ORDER BY " . $filter[0][$i][1] . " ASC";
                        }else{
                              $sql.= " AND c." . $filter[0][$i][0] . "= '" . $filter[0][$i][1]. "'";
                        
                        } 
                      }
                  }

                  $stmt = $db->ejecutar($sql);
                  return $db->listar($stmt);

        }

                
        function sql_filter($filters){
            $continue = "";
            $cont = 0;
            $cont1 = 0;
            $cont2 = 0;
            $select = ' WHERE ';
            foreach ($filters as $key => $row) {
                foreach ( $row as $key => $row_inner) {
                    if ($cont == 0) {
                        foreach ($row_inner as $value) {
                            if ($cont1 == 0) {
                                $continue = $key . ' IN ("'. $value . '"';
                            }else {
                                $continue = $continue  . ', "' . $value . '"';
                            }
                            $cont1++;
                        }
                        $continue = $continue . ')';
                    }else {
                        foreach ($row_inner as $value)  {
                            if ($cont2 == 0) {
                                $continue = ' AND ' . $key . ' IN ("' . $value . '"';
                            }else {
                                $continue = $continue . ', "' . $value . '"';
                            }
                            $cont2++;
                        }
                        $continue = $continue . ')';
                    }
                }
                $cont++;
                $cont2 = 0;
                $select = $select . $continue;
            }
            return $select;
        }

        public function filters($db, $orderby, $total_prod, $items_page, $query) {

            $sql_filter = self::sql_filter($query);

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.category = ct.cod_category AND c.type = t.cod_type $sql_filter ORDER BY $orderby visits DESC LIMIT $total_prod, $items_page";
            
            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function maps_details($db, $id){

            $sql = "SELECT id, city, lat, lng FROM cars WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function update_view($db, $id){

            $sql = "UPDATE cars c SET visits = visits + 1 WHERE id = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_count($db){

            $sql = "SELECT COUNT(*) AS contador FROM car";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        public function select_count_search($db){

            $sql = "SELECT COUNT(*) AS contador FROM car";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        public function select_count_filters($db, $query){

            $filters = self::sql_filter($query);

            $sql = "SELECT COUNT(*) AS num_cars FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.category = ct.cod_category AND c.type = t.cod_type $filters";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_cars($db, $category, $type, $id, $loaded, $items){

            $sql = "SELECT c.*, b.*, t.*, ct.* FROM cars c INNER JOIN brand b INNER JOIN type t INNER JOIN category ct ON c.brand = b.cod_brand "
            . "AND c.type = t.cod_type AND c.category = ct.cod_category WHERE c.category = '$category' AND c.id <> $id OR c.type = '$type' AND c.id <> $id LIMIT $loaded, $items";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function select_load_likes($db, $username){

            $sql = "SELECT l.id_car FROM likes l
					WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
            
        }

        public function select_likes($db, $id, $username){

            $sql = "SELECT l.id_car FROM likes l
					WHERE l.id_user = (SELECT u.id_user FROM users u WHERE u.username = '$username')
					AND l.id_car = '$id'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }

        public function insert_likes($db, $id, $username){

            $sql = "INSERT INTO likes (id_user, id_car) VALUES ((SELECT  u.id_user FROM users u WHERE u.username= '$username') ,'$id');";

            $stmt = $db->ejecutar($sql);
            return "like";
        }

        function delete_likes($db, $id, $username){

            $sql = "DELETE FROM likes WHERE id_car='$id' AND id_user=(SELECT  u.id_user FROM users u WHERE u.username= '$username')";
            $stmt = $db->ejecutar($sql);
            return "unlike";
        }

        function count_related($db, $type_car){
        
            $sql = "SELECT COUNT(*) AS n_prod
            FROM car c 
            WHERE c.motor = '$type_car'";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);

          
          
        }


        function select_related($db,$type, $loaded, $items){
       
            $sql = "SELECT * 
					FROM car c, model m
					WHERE c.model = m.id_model 
					AND c.motor = '$type'
					LIMIT $loaded, $items";

            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
        }


        public function select_search($db, $filters_search) {
            
                $count = 1;


                $sql = "SELECT DISTINCT *
                FROM car c, model m, category cc, brand b
                 WHERE c.model = m.id_model AND c.category = cc.id_cat AND b.name_brand = m.id_brand ";

                for ($i=0; $i < $count; $i++){
                    if ($count==1){
                        if (!empty($filters_search[0]['brand']) && $filters_search[0]['brand'][0]) {
                        $sql .= "AND m.id_brand = '". $filters_search[0]['brand'][0] ."' AND c.category = '" . $filters_search[1]['category'][0] . "'";
                        $count = 2;
                    
                        } else if (!empty($filters_search[0]['category']) && $filters_search[0]['category'][0]) {
                            $sql .=    "AND c.category = '" . $filters_search[0]['category'][0] . "'";
                            $count = 2;
                    
                        } else if (!empty($filters_search[0]['city']) && $filters_search[0]['city'][0]) {
                            $sql .=    "AND c.city = '" . $filters_search[0]['city'][0] . "'";
                            $count = 2;
                        
                        } 
                
                    }else{
                        
                        if (!empty($filters_search[2]['city']) && $filters_search[2]['city'][0]) {

                            $sql .= "AND m.id_brand = '". $filters_search[0]['brand'][0] ."' AND c.category = '" . $filters_search[1]['category'][0] . "'  AND c.city = '" . $filters_search[2]['city'][0] . "'";
                                
                        }  
                    }  

                    $stmt = $db->ejecutar($sql);
                    return $db->listar($stmt);

                }


        }



        public function select_home_filter($db, $filter,$total_prod, $items_page) {
            
            
            $sql= "CALL check_filter_home('$filter','$total_prod','$items_page')";


            $stmt = $db->ejecutar($sql);
            return $db->listar($stmt);
    
        }


        public function insert_car_cart($db, $id_prod, $username) {
            
            $sql = "INSERT INTO cart ( id_car, username, quantity) VALUES ('$id_prod','$username', '1')";

    
            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        public function select_car_cart($db, $id_prod, $username) {
            
            $sql = "SELECT c.cod_prod ,cc.id_car, cc.stock, cc.price, cc.motor, cc.img_car, cc.gear_shift, m.id_brand, m.name_model, c.quantity  FROM cart c, car cc, model m, brand b WHERE c.id_car=cc.id_car AND m.id_model = cc.model AND m.id_brand = b.name_brand  AND username='$username' AND c.id_car='$id_prod'";

            $stmt = $db -> ejecutar($sql);
            return $db -> listar($stmt);
        }

        function update_car_cart($db, $id_prod, $username){
        
            $sql = "UPDATE cart SET quantity = quantity + 1 WHERE username='$username' AND id_car='$id_prod'";  
            $stmt = $db -> ejecutar($sql);
    
        }

    }
    

?>

