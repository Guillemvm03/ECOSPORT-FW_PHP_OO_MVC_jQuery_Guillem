-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2023 a las 18:01:50
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cars`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`` PROCEDURE `check_filter_home` (IN `variable` VARCHAR(255), `total_prod` INT, `items_page` INT)   BEGIN
    DECLARE brand_count INT;
    DECLARE cat_count INT;
    DECLARE motor_count INT;

    -- Verificar si hay coincidencia en name_brand
    SELECT COUNT(*) INTO brand_count FROM brand WHERE name_brand = variable;

    -- Verificar si hay coincidencia en id_cat
    SELECT COUNT(*) INTO cat_count FROM category WHERE id_cat = variable;

    -- Verificar si hay coincidencia en cod_tmotor
    SELECT COUNT(*) INTO motor_count FROM type_motor WHERE cod_tmotor = variable;

    -- Devolver el resultado basado en las coincidencias encontradas
    IF brand_count > 0 THEN
       	SELECT * 
        FROM car c, model m, category cc
        WHERE c.model = m.id_model AND c.category = cc.id_cat AND m.id_brand = variable
        ORDER BY c.visits DESC
        LIMIT total_prod, items_page;
        
    ELSEIF cat_count > 0 THEN
        SELECT * 
        FROM car c, model m, category cc
        WHERE c.model = m.id_model AND c.category = cc.id_cat AND cc.id_cat = variable
        ORDER BY c.visits DESC
        LIMIT total_prod, items_page;
    ELSEIF motor_count > 0 THEN
        SELECT * 
        FROM car c, model m, category cc
        WHERE c.model = m.id_model AND c.category = cc.id_cat AND c.motor = variable
        ORDER BY c.visits DESC
        LIMIT total_prod, items_page;
    ELSE
        SELECT 'No se encontró ninguna coincidencia';
   END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brand`
--

CREATE TABLE `brand` (
  `name_brand` varchar(25) NOT NULL,
  `img_brand` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `brand`
--

INSERT INTO `brand` (`name_brand`, `img_brand`) VALUES
('Audi', 'view/img/brand/audi.svg'),
('BMW', 'view/img/brand/bmw.svg'),
('Chevrolet', 'view/img/brand/chevrolet.png'),
('Citroen', 'view/img/brand/citroen.svg'),
('Dacia', 'view/img/brand/dacia.svg'),
('Ferrari', 'view/img/brand/ferrari.png'),
('Fiat', 'view/img/brand/fiat.svg'),
('Ford', 'view/img/brand/ford.svg'),
('Honda', 'view/img/brand/honda.svg'),
('Hyundai', 'view/img/brand/hyundai.svg'),
('Infiniti', 'view/img/brand/infiniti.png'),
('Jaguar', 'view/img/brand/jaguar.png'),
('Lamborghini', 'view/img/brand/lamborghini.png'),
('Land Rover', 'view/img/brand/land_rover.png'),
('Lexus', 'view/img/brand/lexus.png'),
('Mazda', 'view/img/brand/mazda.svg'),
('Mercedes', 'view/img/brand/mercedes.svg'),
('Mini', 'view/img/brand/mini.svg'),
('Nissan', 'view/img/brand/nissan.svg'),
('Opel', 'view/img/brand/opel.svg'),
('Peugot', 'view/img/brand/peugot.png'),
('Porsche', 'view/img/brand/porche.png'),
('Renault', 'view/img/brand/renault.svg'),
('Seat', 'view/img/brand/seat.svg'),
('Suabru', 'view/img/brand/subaru.png'),
('Suzuki', 'view/img/brand/suzuki.png'),
('Tesla', 'view/img/brand/tesla.png'),
('Volkswagen', 'view/img/brand/volkswage.svg'),
('Volvo', 'view/img/brand/volvo.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `car`
--

CREATE TABLE `car` (
  `id_car` int(11) NOT NULL,
  `vin_num` varchar(18) DEFAULT NULL,
  `num_plate` varchar(8) DEFAULT NULL,
  `model` int(25) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `Km` int(8) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `num_doors` varchar(20) DEFAULT NULL,
  `motor` varchar(20) DEFAULT NULL,
  `gear_shift` varchar(20) DEFAULT NULL,
  `matricualtion_date` varchar(10) DEFAULT NULL,
  `price` int(8) DEFAULT NULL,
  `img_car` varchar(300) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `lon` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `visits` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `car`
--

INSERT INTO `car` (`id_car`, `vin_num`, `num_plate`, `model`, `category`, `Km`, `color`, `num_doors`, `motor`, `gear_shift`, `matricualtion_date`, `price`, `img_car`, `lat`, `lon`, `city`, `count`, `visits`, `stock`) VALUES
(1, 'ALOEGLSEO34782341', '1393ABC', 1, 3, 1500, 'White', '5', 'A', 'Automatic', '10/01/2015', 15000, 'view/img/car_image/car1.png', '39.4697065', '-0.3763353', 'Valencia', 36, 150, 10),
(2, 'BOOEGLSEO34122342', '2393HJC', 2, 2, 35000, 'Blue', '5', 'G', 'Automatic', '12/05/2017', 40000, 'view/img/car_image/car2.png', '38.8220593', '-0.6063927', 'Ontinyent', 0, 19, 25),
(3, 'CEOEGLSEO34742343', '3393NRO', 3, 5, 42000, 'Red', '3', 'E', 'Automatic', '23/07/2016', 22678, 'view/img/car_image/car3.png', '40.2518568', '-0.0615051', 'Castellón', 0, 1, 13),
(4, 'SUSEGLSEO12782344', '4393LOL', 4, 6, 1, 'White', '5', 'A', 'Automatic', '09/08/2019', 11230, 'view/img/car_image/car4.png', '40.4167047', '-3.7035825', 'Madrid', 2, 5, 5),
(5, 'ZLOEGLSEO34782345', '5393ARA', 5, 1, 5500, 'Grey', '5', 'H', 'Automatic', '21/11/2020', 55000, 'view/img/car_image/car5.png', '37.9923795', '-1.1305431', 'Murcia', 1, 19, 8),
(6, 'NLOEGLSEO54782347', '7393YAC', 7, 3, 3100, 'White', '5', 'G', 'Automatic', '14/12/2015', 32000, 'view/img/car_image/car6.png', '41.1172364', '1.2546057', 'Tarragona', 0, 27, 11),
(7, 'SOOEGLSEO34712348', '8393JBL', 8, 2, 27879, 'Black', '5', 'H', 'Automatic', '19/10/2016', 80000, 'view/img/car_image/car7.png', '38.9950921', '-1.8559154', 'Albacete', 1, 142, 11),
(8, 'HTOEGLSEO34782349', '9393SOS', 9, 1, 32765, 'Grey', '3', 'G', 'Automatic', '05/07/2020', 21000, 'view/img/car_image/car8.png', '41.6521342', '-0.8809428', 'Zaragoza', 0, 14, 15),
(9, 'RMAEGLSEO34782340', '0393CAR', 10, 6, 1, 'White', '5', 'H', 'Automatic', '30/09/2019', 35000, 'view/img/car_image/car9.png', '42.343926', '-3.696977', 'Burgos', 1, 18, 16),
(10, 'JKLEGLSEO34782341', '1093ABC', 6, 3, 1500, 'Blue', '5', 'A', 'Manual', '10/01/2015', 17000, 'view/img/car_image/car6.png', '43.1595664', '-4.0878382', 'Cantabria', 0, 33, 2),
(11, 'POLEGLSEO34122342', '1193HJC', 11, 2, 35000, 'Orange', '5', 'G', 'Manual', '12/05/2017', 40000, 'view/img/car_image/car11.png', '42.8804219', '-8.5458608', 'Santiago', 0, 1, 3),
(12, 'RTYEGLSEO34742343', '1293NRO', 12, 5, 42000, 'Grey', '3', 'E', 'Manual', '23/07/2016', 7678, 'view/img/car_image/car12.png', '37.6019353', '-0.9841152', 'Cartagena', 0, 2, 7),
(13, 'ILWEGLSEO12782344', '1393LOL', 13, 6, 1, 'Red', '5', 'A', 'Automatic', '09/08/2019', 11230, 'view/img/car_image/car13.png', '37.8845813', '-4.7760138', 'Cordoba', 3, 0, 9),
(14, 'PLNEGLSEO34782345', '1493ARA', 14, 1, 5500, 'White', '5', 'H', 'Automatic', '21/11/2020', 55000, 'view/img/car_image/car15.png', '39.1748426', '-6.1529891', 'Extremadura', 0, 0, 17),
(15, 'RTVEGLSEO54782347', '1593YAC', 15, 3, 3000, 'Brown', '5', 'E', 'Automatic', '14/12/2015', 32000, 'view/img/car_image/car15.png', '42.2814642', '-2.482805', 'La Rioja', 0, 1, 9),
(16, 'VEFEGLSEO34712348', '1693JBL', 16, 2, 27879, 'White', '5', 'H', 'Manual', '19/10/2016', 34000, 'view/img/car_image/car17.png', '41.6521328', '-4.728562', 'Valladolid', 0, 0, 12),
(17, 'COCEGLSEO34782349', '1793SOS', 17, 1, 32765, 'Orange', '3', 'G', 'Manual', '05/07/2020', 21000, 'view/img/car_image/car17.png', '43.2630018', '-2.9350039', 'Bilbao', 0, 1, 11),
(18, 'BVCEGLSEO34782340', '1893CAR', 18, 6, 1, 'Blue', '5', 'H', 'Automatic', '30/09/2019', 13040, 'view/img/car_image/car18.png', '40.9651572', '-5.6640182', 'Salamanca', 5, 50, 18),
(19, 'NTCEGLSEO34782349', '1993SOS', 19, 1, 32765, 'Brown', '3', 'G', 'Manual', '05/07/2020', 17500, 'view/img/car_image/car19.png', '38.7669181', '-0.610892', 'Bocairent', 2, 2, 4),
(20, 'KOPEGLSEO34782349', '2093SOS', 20, 1, 32765, 'Black', '3', 'G', 'Automatic', '05/07/2020', 16000, 'view/img/car_image/car20.png', '39.4639546', '-0.4293866', 'Xirivella', 0, 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `cod_prod` int(11) NOT NULL,
  `id_car` int(15) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cart`
--

INSERT INTO `cart` (`cod_prod`, `id_car`, `username`, `quantity`) VALUES
(136, 1, 'Yolanda', 2),
(138, 18, 'Yolanda', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id_cat` int(11) NOT NULL,
  `name_cat` varchar(25) NOT NULL,
  `img_cat` varchar(100) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id_cat`, `name_cat`, `img_cat`, `description`) VALUES
(1, 'Km0', 'view/img/categories/km0.png', 'Up to 10000km'),
(2, '2nd-Hand', 'view/img/categories/second_hand.png', 'Legit'),
(3, 'Renting', 'view/img/categories/renting.png', 'Simple and fast'),
(4, 'Pre-Owned', 'view/img/categories/pre_ownded.png', 'Incredible price quality'),
(5, 'Offer', 'view/img/categories/offer.png', 'Best prices'),
(6, 'New', 'view/img/categories/new.png', 'Flawless');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coupons`
--

CREATE TABLE `coupons` (
  `cod_coupon` varchar(30) NOT NULL,
  `state` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_cars`
--

CREATE TABLE `img_cars` (
  `id_img` int(11) NOT NULL,
  `id_car` int(11) DEFAULT NULL,
  `img_cars` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `img_cars`
--

INSERT INTO `img_cars` (`id_img`, `id_car`, `img_cars`) VALUES
(1, 1, 'view/img/car_image/car1.png'),
(2, 1, 'view/img/car_image/car1.png'),
(3, 1, 'view/img/car_image/car1.png'),
(4, 1, 'view/img/car_image/car1.png'),
(5, 2, 'view/img/car_image/car2.png'),
(6, 2, 'view/img/car_image/car2.png'),
(7, 2, 'view/img/car_image/car2.png'),
(8, 2, 'view/img/car_image/car2.png'),
(9, 3, 'view/img/car_image/car3.png'),
(10, 3, 'view/img/car_image/car3.png'),
(11, 3, 'view/img/car_image/car3.png'),
(12, 3, 'view/img/car_image/car3.png'),
(13, 4, 'view/img/car_image/car4.png'),
(14, 4, 'view/img/car_image/car4.png'),
(15, 4, 'view/img/car_image/car4.png'),
(16, 4, 'view/img/car_image/car4.png'),
(17, 5, 'view/img/car_image/car5.png'),
(18, 5, 'view/img/car_image/car5.png'),
(19, 5, 'view/img/car_image/car5.png'),
(20, 5, 'view/img/car_image/car5.png'),
(21, 6, 'view/img/car_image/car6.png'),
(22, 6, 'view/img/car_image/car6.png'),
(23, 6, 'view/img/car_image/car6.png'),
(24, 6, 'view/img/car_image/car6.png'),
(25, 7, 'view/img/car_image/car7.png'),
(26, 7, 'view/img/car_image/car7.png'),
(27, 7, 'view/img/car_image/car7.png'),
(28, 7, 'view/img/car_image/car7.png'),
(29, 8, 'view/img/car_image/car8.png'),
(30, 8, 'view/img/car_image/car8.png'),
(31, 8, 'view/img/car_image/car8.png'),
(32, 8, 'view/img/car_image/car8.png'),
(33, 9, 'view/img/car_image/car9.png'),
(34, 9, 'view/img/car_image/car9.png'),
(35, 9, 'view/img/car_image/car9.png'),
(36, 9, 'view/img/car_image/car9.png'),
(37, 10, 'view/img/car_image/car10.png'),
(38, 10, 'view/img/car_image/car10.png'),
(39, 10, 'view/img/car_image/car10.png'),
(40, 10, 'view/img/car_image/car10.png'),
(41, 11, 'view/img/car_image/car11.png'),
(42, 11, 'view/img/car_image/car11.png'),
(43, 11, 'view/img/car_image/car11.png'),
(44, 11, 'view/img/car_image/car11.png'),
(45, 12, 'view/img/car_image/car12.png'),
(46, 12, 'view/img/car_image/car12.png'),
(47, 12, 'view/img/car_image/car12.png'),
(48, 12, 'view/img/car_image/car12.png'),
(49, 13, 'view/img/car_image/car13.png'),
(50, 13, 'view/img/car_image/car13.png'),
(51, 13, 'view/img/car_image/car13.png'),
(52, 13, 'view/img/car_image/car13.png'),
(53, 14, 'view/img/car_image/car14.png'),
(54, 14, 'view/img/car_image/car14.png'),
(55, 14, 'view/img/car_image/car14.png'),
(56, 14, 'view/img/car_image/car14.png'),
(57, 15, 'view/img/car_image/car15.png'),
(58, 15, 'view/img/car_image/car15.png'),
(59, 15, 'view/img/car_image/car15.png'),
(60, 15, 'view/img/car_image/car15.png'),
(61, 16, 'view/img/car_image/car16.png'),
(62, 16, 'view/img/car_image/car16.png'),
(63, 16, 'view/img/car_image/car16.png'),
(64, 16, 'view/img/car_image/car16.png'),
(65, 17, 'view/img/car_image/car17.png'),
(66, 17, 'view/img/car_image/car17.png'),
(67, 17, 'view/img/car_image/car17.png'),
(69, 18, 'view/img/car_image/car18.png'),
(70, 18, 'view/img/car_image/car18.png'),
(71, 18, 'view/img/car_image/car18.png'),
(72, 18, 'view/img/car_image/car18.png'),
(73, 19, 'view/img/car_image/car19.png'),
(74, 19, 'view/img/car_image/car19.png'),
(75, 19, 'view/img/car_image/car19.png'),
(76, 19, 'view/img/car_image/car19.png'),
(77, 20, 'view/img/car_image/car20.png'),
(78, 20, 'view/img/car_image/car20.png'),
(79, 20, 'view/img/car_image/car20.png'),
(80, 20, 'view/img/car_image/car20.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_like` int(11) NOT NULL,
  `id_user` int(30) NOT NULL,
  `id_car` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model`
--

CREATE TABLE `model` (
  `id_model` int(20) NOT NULL,
  `name_model` varchar(25) DEFAULT NULL,
  `id_brand` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `model`
--

INSERT INTO `model` (`id_model`, `name_model`, `id_brand`) VALUES
(1, 'A1', 'Audi'),
(2, 'Q5', 'Audi'),
(3, 'TT', 'Audi'),
(4, 'A3', 'Audi'),
(5, 'A7', 'Audi'),
(6, 'Serie3', 'BMW'),
(7, 'x5', 'BMW'),
(8, 'x6', 'BMW'),
(9, 'Clase A', 'Mercedes'),
(10, 'Clase C', 'Mercedes'),
(11, 'Clase G', 'Mercedes'),
(12, 'GLE', 'Mercedes'),
(13, 'Leon', 'Seat'),
(14, 'Ibiza', 'Seat'),
(15, 'Tucson', 'Hyundai'),
(16, 'i30', 'Hyundai'),
(17, 'Ranger', 'Ford'),
(18, 'Focus', 'Ford'),
(19, 'Cooper', 'Mini'),
(20, 'Vitara', 'Suzuki');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id_ped` int(100) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `cod_prod` varchar(20) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `total_price` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_ped`, `username`, `cod_prod`, `quantity`, `price`, `total_price`, `fecha`) VALUES
(1581, 'Guillem', '134', 1, 13040, 13040, '2023-06-07 00:00:00'),
(1582, 'Guillem', '135', 1, 15000, 15000, '2023-06-07 00:00:00'),
(1583, 'Yolanda', '136', 2, 15000, 30000, '2023-06-07 00:00:00'),
(1584, 'Yolanda', '138', 1, 13040, 13040, '2023-06-07 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type_motor`
--

CREATE TABLE `type_motor` (
  `cod_tmotor` varchar(10) NOT NULL,
  `name_tmotor` varchar(25) NOT NULL,
  `img_tmotor` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type_motor`
--

INSERT INTO `type_motor` (`cod_tmotor`, `name_tmotor`, `img_tmotor`) VALUES
('A', 'Adapted', 'view/img/type_cars/adapted.jpg'),
('E', 'Electric', 'view/img/type_cars/electric.jpg'),
('G', 'Gasoline', 'view/img/type_cars/gasoline.jpg'),
('H', 'Hybrid', 'view/img/type_cars/hibrid.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(30) NOT NULL,
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `type_user` varchar(50) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `token_email` char(35) DEFAULT NULL,
  `activate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `type_user`, `avatar`, `token_email`, `activate`) VALUES
(77, 'Yolanda', '$2y$12$S1UJN33EpJ1tvm43ezICT.0Gb6Fs1RCQO3Dkc6LIYXPT.9EuqKjw6', 'guillemvicent09@gmail.com', 'client', 'https://i.pravatar.cc/500?u=/022d44697b16f3fa86167c580dcb2f33', '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`name_brand`);

--
-- Indices de la tabla `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id_car`),
  ADD UNIQUE KEY `vin_num` (`vin_num`),
  ADD UNIQUE KEY `num_plate` (`num_plate`),
  ADD KEY `model` (`model`),
  ADD KEY `category` (`category`),
  ADD KEY `car_ibfk_3` (`motor`);

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cod_prod`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `fk_cart_username` (`username`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_cat`) USING BTREE;

--
-- Indices de la tabla `img_cars`
--
ALTER TABLE `img_cars`
  ADD PRIMARY KEY (`id_img`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_like`),
  ADD KEY `id_car` (`id_car`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id_model`),
  ADD UNIQUE KEY `name_model` (`name_model`),
  ADD KEY `id_brand` (`id_brand`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_ped`);

--
-- Indices de la tabla `type_motor`
--
ALTER TABLE `type_motor`
  ADD PRIMARY KEY (`cod_tmotor`) USING BTREE,
  ADD UNIQUE KEY `name_tmotor` (`name_tmotor`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `cod_prod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `likes`
--
ALTER TABLE `likes`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id_ped` int(100) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1585;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`),
  ADD CONSTRAINT `fk_cart_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_car`) REFERENCES `car` (`id_car`),
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
