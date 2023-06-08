# ECOSPORT-FW_PHP_OO_MVC_jQuery_Guillem🚗

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=bootstrap,css,html,js,php,github" />
  </a>
 <a   <div style="display: flex; align-items: flex-start;"><img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="50" height="50" /></div></a>
</p>


## Descripción

ECOSPORT es una innovadora aplicación web dedicada a la venta de coches de segunda mano. Diseñada con una arquitectura Modelo-Vista-Controlador (MVC), ofrece una experiencia intuitiva y fácil de usar para los usuarios interesados en adquirir vehículos de calidad y asequibles.

Con ECOSPORT, puedes explorar una amplia selección de coches de segunda mano de diferentes marcas, modelos y categorías, todo en un solo lugar. La aplicación te permite buscar y filtrar los vehículos según tus preferencias, como el kilometraje, el precio y más. Además, cuenta con una interfaz visualmente atractiva y fácil de navegar, que facilita la búsqueda y la comparación de diferentes opciones.

ECOSPORT utiliza el potente framework jQuery para brindar una experiencia de usuario fluida y dinámica. Con su amplia gama de funciones interactivas, como la carga de contenido en tiempo real, la validación de formularios y las animaciones suaves, la aplicación garantiza una navegación sin problemas y una interacción agradable.

ECOSPORT es la solución perfecta para aquellos que buscan coches de segunda mano de calidad y confianza. ¡Explora nuestra aplicación hoy mismo y encuentra el vehículo perfecto que se adapte a tus necesidades y presupuesto!



## Contenido 📖

_¿Como está estructurado?_

La web se compone de los siguientes módulos:

1️⃣ __Home__ 🏠:

  El módulo principal donde se muestran los siguientes apartados:
  * Contiene un carrusel con todas las marcas.
  *Contiene las categorías.
  *Selector de filtro por tipo de motor.
  *Carrusel con los coches más visitados.
  *Listado de revistas relacionadas con coches.
  
2️⃣ __Shop__ 💵:

  El módulo donde se puede visualizar el listado de coches disponibles. Incluye lo siguiente:
  * Listado de los coches almacenados.
  *Selector de filtros por marca, tipo de motor, categoría y color.
  *Opciones como eliminar los filtros aplicados y seleccionar cualquiera de los filtros aplicados anteriormente.
  *Selector de orden por kilómetros y precio.
  *Selector de página.
  *Componente de mapa con las ubicaciones de los coches.
  *Opción de Me gusta. Requiere iniciar sesión con un usuario.
  *Botón para ver los detalles de cada coche. Incluye las características de este, opción de Me gusta, opción para añadir unidades al carrito, ubicación en el        mapa y listado con los coches relacionados.

3️⃣ __Search__ 🔎:

  El módulo que sirve para buscar coches desde cualquier parte de la aplicación web. Incluye lo siguiente:
  *Filtro por marca.
  *Filtro por modelo, dependiendo de la marca seleccionada.
  *Filtro por ciudad.

4️⃣ __Login__ 🙎:

  El módulo que sirve para poder identificarte con un usuario. Incluye lo siguiente:
  * Opción de iniciar sesión con un nombre de usuario y una contraseña.
  * Opción de registrarse con un nombre de usuario, un correo electrónico y una contraseña. El nombre y el correo no se pueden repetir, y todos los campos deben  de cumplir unos requisitos, como la longitud o algunos carácteres especiales. Requiere una verificación que se envía al correo electrónico para poder iniciar sesión.
  * Opción de recuperar la contraseña mediante correo electrónico.
  * Una vez se ha iniciado sesión, se muestra el nombre del usuario con su avatar y la opción de cerrar sesión.
  * Existen algunas funciones como dar Me gusta o añadir al carrito, las cuales requieren un inicio de sesión.

5️⃣ __Cart__ 🛒:

  El módulo que permite añadir al carrito los coches y proceder a la compra de estos. Incluye lo siguiente:
  * Desde los detalles de un coche se . Se requiere inicio de sesión y se tiene en cuenta el stock del coche a la hora de sumar unidades.
  * Una vez añadido al carrito un artículo, se puede acceder a la ventana para visualizar su contenido.
  * Dentro del carrito, se pueden ver los coches añadidos con su imagen (si se hace click en la imagen, se redirige a los detalles del coche), su nombre, su cantidad (se puede actualizar la cantidad desde el propio carrito, con comprobación de stock), su precio y un botón de eliminar del carrito.
  * Subtotal y total tanto para cada 
  * Opción de realizar compra. Se actualiza el stock de los coches en la base de datos y se elimina el carrito. 

## Requisitos previos

- PHP 7.0 o versiones superiores.
- Servidor web compatible con PHP ( Apache).
- Base de datos MySQL para almacenar la información de los vehículos y los datos de los usuarios.

