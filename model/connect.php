<?php


	class connect{
		public static function con(){
		
// return 'iepa ';

			$host = '127.0.0.1';  
    		$user = "root";                     
    		$pass = "";                             
    		$db = "cars";                      
    		$port = 3306;                           
    		
    		
    		$conexion = mysqli_connect($host, $user, $pass, $db, $port)or die(mysql_error());
			return $conexion;
		}
		public static function close($conexion){
			mysqli_close($conexion);
		}
	}