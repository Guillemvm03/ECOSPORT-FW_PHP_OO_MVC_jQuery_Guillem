# ECOSPORT-FW_PHP_OO_MVC_jQuery_Guillem

README
Esta es una aplicación web de venta de vehículos online desarrollada con:

 icon

La aplicación sigue una arquitectura Modelo-Vista-Controlador (MVC) y utiliza el framework jQuery. También se ha implementado el uso de JSON Web Tokens (JWT) para la creación de tokens de autenticación, así como la integración de Mailgun para el envío de correos electrónicos de verificación de cuenta y recuperación de contraseña.
Características principales
La aplicación cuenta con los siguientes módulos:

1. Home:
Muestra la página principal de la aplicación, proporcionando información general sobre la plataforma de venta de vehículos online. Donde podemos filtrar por marca con carrusel, categoria, tipo de combustible y también se muestran los mas visitados. Tenemos una selección de revistas relacionadas con el mundo del motor con scroll, mediante una api donde se enlaza para su compra.
2. Shop:
Permite a los usuarios explorar y buscar vehículos disponibles para la venta. Los usuarios pueden aplicar filtros y ver detalles específicos de cada vehículo, como descripción, características, precio, etc. Posee paginado para mostrar los resultados de la busqueda o de todos los vehículos Tenemos una geolocalización donde se encuentran los vehículos y una pequeña descripcion e imagen en el mapa, donde podemos ir a ver los detalles de los mismos. Tambien nos encontramos un search en el menu de la página, donde automaticamente se autocompleta por marca, categoria o ciudad, al seleccionar uno de los de busqueda. Se le pueden asignar likes a los productos, logeado y deslogueado, si estas deslogueado te redirige a login para loguearte y enviate al vehiculo en cuestion. En este módulo cuando se selecciona un coche para ver en detalle la información, mostramos también vehículos relacionados en este caso por marca con scroll.
3. Contacto:
Proporciona un formulario de contacto donde los usuarios pueden enviar consultas o comentarios sobre la aplicación o los vehículos en venta.
4. Login y Register:
Estos módulos permiten a los usuarios crear una cuenta o iniciar sesión en la aplicación. Se utiliza JWT para autenticar a los usuarios y proporcionar acceso seguro a las funcionalidades. Posee verificación por correo electrónico y recuperación de contraseña.
5. Carrito:
Permite a los usuarios agregar vehículos de interés a su carrito de compras y realizar la compra posteriormente.
Requisitos previos
PHP 7.0 o versiones superiores.
Servidor web compatible con PHP ( Apache).
Base de datos MySQL para almacenar la información de los vehículos y los datos de los usuarios.
