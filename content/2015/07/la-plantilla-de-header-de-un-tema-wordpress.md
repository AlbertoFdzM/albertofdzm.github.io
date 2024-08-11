---
title: La Plantilla de Header de un Tema WordPress
date: 2015-07-24
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

Te toca empezar a darle rasgos a tu pequeño Tema de WordPress, empezando por la cabeza, el archivo `header.php` y validándolo con un estándar _HTML Doctype_. Vas a tener muchas raciones de PHP en esta entrada. También manosearás un poquito el archivo `functions.php`.

![wordpress-theme-metas-cloud](/old-posts-images/2015/07/wordpress-theme-metas-cloud.png)

Teniendo en cuenta que has seguido las lecciones anteriores deberías tener ya algo de código útil en los archivos creados durante [la lección de Plantillas Y Estructura De Carpetas](/2015/05/plantillas-y-estructura-de-carpetas-en-wordpress/). Si no tienes nada con lo que trabajar date un pase por esa entrada.

## La Sección Del `head` Del Tema

Ahora mismo tu escueto temita WordPress es técnicamente invalido. Esto es debido a la cantidad de cosas que te faltan por añadirle como por ejemplo [la notación de Doctype](http://www.w3schools.com/tags/tag_doctype.asp) que se encarga de decirle a los navegadores que versión de HTML están procesando.

Edita tu fichero `header.php` y embútele el siguiente código al principio del todo:

```php
<?php
/**
 * La cabecera de tu tema.
 *
 * Se encarga de imprimir todo lo que se contiene en los tags
 * hasta el tag de <div id="content">
 *
 * @package The First Pixel
 * @since The First Pixel 0.0
 */
?>
```

Ahora toca añadir el tag `html` con algunos atributos extra, para detectar distintos navegadores, como IE8, y en ese caso, que se desplieguen unos estilos específicos.

```php
<!--[if IE 8]>
<html id="ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 8) ]><!-->
<html <?php language_attributes(); ?>>
<!--<![endif]-->
```

Lo que he hecho ha sido añadir un par de condicionales (`<!--[if IE 8]>`) que se aplican cuando el navegador que los procesa es Internet Explorer 8 y sólo cuando es IE8.

Es el turno del tag `head` aquí es donde va la chicha de [los metas](https://es.wikipedia.org/wiki/Metadato) (meta-chicha), que es la que da vidilla a la web cuando se trata de ser procesada por otras máquinas o apps (Google, Facebook, Twitter, Feeds, etc.). Código va:

```php
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width">
<title><?php
/*
 * Muestra la etiqueta <title> basándose en que lugar estamos de la web.
 */
global $page, $paged;

wp_title( '|', true, 'right' );

// Añade el nombre de la web.
bloginfo( 'name' );

// Recoge la descripción de la web para la página principal.
$site_description = get_bloginfo( 'description', 'display' );
if ( $site_description && ( is_home() || is_front_page() ) )
echo " | $site_description";

// Añade un numerito de página si es que es necesario:
if ( $paged >= 2 || $page >= 2 )
echo ' | ' . sprintf( __( 'Página %s', 'the-first-pixel' ), max( $paged, $page ) );

?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.min.js" type="text/javascript"></script>
<![endif]-->
<?php wp_head(); ?>


<body <?php body_class(); ?>>
```

Lo explico por partes:

```php
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width">
```

La primera linea indica el tipo de codificación que se está usando (normalmente `UTF-8` es lo que saldrá) y la segunda se encarga de fijar las medidas del `viewport` (que nombre más chulo), que es por decirlo de manera sencilla el “visor” de la web (es casi la ventana pero como que no), a través de él ves la web y al hacer scroll es él el que se mueve (no tú).

```php
<title><?php
/*
 * Muestra la etiqueta <title> basándose en que lugar estamos de la web.
 */
global $page, $paged;

wp_title( '|', true, 'right' );

// Añade el nombre de la web.
bloginfo( 'name' );

// Recoge la descripción de la web para la página principal.
$site_description = get_bloginfo( 'description', 'display' );
if ( $site_description && ( is_home() || is_front_page() ) )
echo " | $site_description";

// Añade un numerito de página si es que es necesario:
if ( $paged >= 2 || $page >= 2 )
echo ' | ' . sprintf( __( 'Página %s', 'the-first-pixel' ), max( $paged, $page ) );

?></title>
```

Esta es la señora etiqueta de título `<title>`, que se encarga de decirle al usuario (incluso a los que tienen problemas de visión!). La apariencia de este título depende de en que página te encuentres. Troceadito entra mejor.

Para toda página de tu tema **exceptuando** la página principal, querrás que se muestra inmediatamente el título de dicha página acompañado de un separador, en este caso una barra vertical. Pues bien, la función `wp_title()` de WordPress es la que ejecuta esta magia. Por supuesto después del separador también querrás tener el nombre de la web no?. La ocurrente función de `bloginfo()` se encarga de ello.

Qué pasa con la página principal? Hay que poner una descripción aquí también.

Primero he puesto una variable muy útil llamada `$site_desciption` que se encarga de almacenar la descripción de la web, por medio de la función `get_bloginfo()`.

Y a continuación tan sólo hay que decidir si mostrarla o no dependiendo de:

1. Si tenemos descripción en nuestra web
2. Si estamos en la página principal

Por ultimo, falta dar un poquito más de información al usuario, los números de página.

A otra cosa mariposa:

```php
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
```

La primera línea añade soporte para [XFN](https://es.wikipedia.org/wiki/XHTML_Friends_Network) (lo que hace que tu web sea más sociable y se relacione con otras webs), y la segunda ofrece un link para los [`pingbacks`](http://ayudawp.com/introduccion-a-pingbacks-y-trackbacks/).

```php
<!--[if lt IE 9]>
<script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.min.js" type="text/javascript"></script>
<![endif]-->
```

Ahí va! pues ahí tienes otro condicional del _\[me]jor \[n]avegador de todos los \[ti]empos habidos y po\[r] h\[a]ber_, que se encargará de cargar un fichero JS cuando la web sea visitada por versiones anteriores a IE9. Dicho fichero facilita a los viejunos navegadores entender el lenguaje de la juventud HTML.

Esta línea es "casi" opcional, ya que si no te interesa que tu web sea compatible con versiones viejunas de navegadores jurásicos, no hace falta añadirlo. Pero si insistes debes [descargar el archivo `html5shiv.min.js`](https://raw.githubusercontent.com/aFarkas/html5shiv/master/dist/html5shiv.min.js) y posicionarlo en la carpeta `/js/` del tema.

Y luego:

```php
<?php wp_head(); ?>
```

La función `wp_head()` de WordPress es una de las más importantes, es la que se encarga de desplegar muchas funcionalidades dentro del tag `<head>`.

```php
<body <?php body_class(); ?>>
```

Aquí comienza la parte visual de tu web, comenzando con la etiqueta `<body>`. En este caso la función `body_class()` se encargará de añadir un par de clases muy útiles cuando entres a trapo con los estilos CSS de tu tema WordPress. Estas clases variarán dependiendo de configuraciones o de en qué sitio de la web se encuentre el usuario.

## La Sección Del `header`

Ya casi termino, vamos con la cabecera de la web.

De nuevo en el archivo `header.php` toca añadir contenido dentro de las etiquetas `<hgroup>` que ya definimos en lecciones anteriores.

```php
<hgroup>
     <h1 class="site-title"><a href="<?php echo home_url( '/' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
     <h2 class="site-description"><?php bloginfo( 'description' ); ?></h2>
</hgroup>
```

En el código de arriba se está utilizando la función [home_url()](http://codex.wordpress.org/Function_Reference/home_url) de WordPress. Esta se encarga de imprimir la URL a la página principal de nuestra web.

A continuación para que tengas el nombre y descripción de tu web debes usar la función `bloginfo()`, que ya se mostró antes. Ten en cuenta que esta vez también estamos usando [una de las funciones de saneamiento de datos que comentamos en lecciones anteriores, `esc_attr()`](/2015/07/seguridad-para-tu-tema-wordpress). Ojito con la función `bloginfo()` de WordPress, porque [puede proporcionar gran cantidad de información sobre la web](http://codex.wordpress.org/Template_Tags/bloginfo). Si entiendes todo lo que esta pasando hasta ahora, estas entendiendo un poquito cómo funciona WordPress.

Qué tal añadir a tu Tema WordPress un poquito de navegación? Justo entre las etiquetas `<nav>` añade lo siguiente:

```php
<h1 class="assistive-text"><?php _e( 'Menú', 'the-first-pixel' ); ?></h1>
<div class="assistive-text skip-link"><a href="#content" title="<?php _e( 'Saltar al contenido', 'the-first-pixel' ); ?></a></div>
```

Estas lineas se encargarán de facilitar a los usuarios con lectores de pantalla un atajo para ir directos al contenido sin tener que pasar por el menú.

Turno de los menús! En una de las lecciones anteriores [expliqué cómo registrar un menú para ser usado en un Tema WordPress](/2015/07/estableciendo-las-funciones-de-tu-tema-wordpress/) y durante la cual se registró un menú para este tema. Pues ha llegado el momento de usarlo! a continuación del código anterior (dentro de las etiquetas `<nav>`):

```php
<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
```

Si hubieras registrado más menús en el fichero de `functions.php` podrías desplegarlos en tu tema de la misma manera, usando la función `wp_nav_menu()` y sustituyendo el identificador `primary` por el que hayas usado.

## Acoplando Estilos Y Funcionalidad JS En Temas WordPress

Turno para el fichero `functions.php`! Esta vez lo vas a usar para cargar dinámicamente estilos y archivos JS. Ábrelo y a operar se ha dicho:

```php
/**
 * Registro de estilos y scripts
 */
function the_first_pixel_scripts() {
    wp_enqueue_style( 'style', get_stylesheet_uri() );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    wp_enqueue_script( 'navigation', get_template_directory_uri() . '/js/navigation.js', array(), '0.0', true );

    if ( is_singular() && wp_attachment_is_image() ) {
        wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '0.0' );
    }
}
add_action( 'wp_enqueue_scripts', 'the_first_pixel_scripts' );
```

Aquí estoy haciendo uso de las funciones de WordPress [`wp_enqueue_style()`](http://codex.wordpress.org/Function_Reference/wp_enqueue_style) y [`wp_enqueue_script()`](http://codex.wordpress.org/Function_Reference/wp_enqueue_script) para cargar las hojas de estilos CSS para el Tema WordPress y los archivos JavaScript. Es muy recomendable que uses estas dos funciones cada vez que quieras cargar este tipo de archivos en lugar de añadir su llamada [“hardcodeada”](https://es.wikipedia.org/wiki/Hard_code) en los archivos `header.php` o `footer.php`.

Después de definir la función `the_first_pixel()` verás la estoy anclando a la acción [`wp_enqueue_scripts`](http://codex.wordpress.org/Plugin_API/Action_Reference/wp_enqueue_scripts), la cual se encarga de desplegar los links a los ficheros tanto en la cabecera como en el pie.

Te comento por encima que hace la función que acabas de ver.

```php
if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
    wp_enqueue_script( 'comment-reply' );
}
```

En esta parte del código se está registrando el script de `comment-reply.js` (el cual viene integrado en WordPress) y se encarga de mover el formulario de respuesta a comentarios justo debajo del comentario al que estés respondiendo. Presta atención a que con el `if` consigues que ese script sólo se cargue cuando te encuentres en una entrada con comentarios activados y con la funcionalidad de comentarios anidados. De ese modo se evita cargar código innecesario a lo largo de la web.

```php
wp_enqueue_script( 'navigation', get_template_directory_uri() . '/js/navigation.js', array(), '0.0', true );

if ( is_singular() && wp_attachment_is_image() ) {
    wp_enqueue_script( 'keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '0.0' );
}
```

Estos dos scripts son "opcionales" si no deseas tenerlos en tu tema (tú te lo pierdes) puedes eliminar estas lineas. El primero `navigation.js` permite convertir el menú para que sea más adecuado y navegable cuando la web se esté visitando desde un dispositivo móvil. El siguiente, `keyboard-image-navigation.js` añade la alucinante mejora de navegar entre imágenes cuando estés en una página de imagen adjunta (y está configurado para solo cargarse en esos casos).

Dato, si te fijas en uno de los scripts verás que se indica un `array` que contiene el valor `'jquery'`, con esto indicamos que dicho script necesita [jQuery](http://jquery.com/) para funcionar. Con esto consigues que WordPress entienda que antes de cargar el script que acabas de registrar debe cargar jQuery. Y no te preocupes, ya que WordPress (el maravilloso WordPress) es tan tan considerado que [viene con múltiples librerías JavaScript incluidas](http://codex.wordpress.org/Function_Reference/wp_enqueue_script#Default_Scripts_Included_and_Registered_by_WordPress).

Así que ya sabes, si quieres añadir algún fichero JavaScript más, tan sólo añádelo a tu proyecto y regístralo en esta función para que WordPress lo cargue.

Quiero para'o! Te faltan los JS en el proyecto, para que WordPress pueda cargarlos correctamente, descárgalos y posiciónalos en la carpeta `/js/` de tu tema WordPress:\
– [navigation.js](https://raw.githubusercontent.com/Automattic/_s/18f843ed0343411ee20ac85d01f52d1d9c786d80/js/navigation.js)\
– [keyboard-image-navigation.js](https://raw.githubusercontent.com/Automattic/_s/4c99b2aba895834d4551eb03c790ecc337351ca7/js/keyboard-image-navigation.js)

Puf vaya tupa, Eso es todo! La plantilla del header de tu tema WordPress está optimizada para buscadores y armada de código útil, además tienes una bonita función para cargar los archivos JS y CSS.

## Índice del Tutorial de Desarrollo de Temas WordPress

Preparado para dar tu primeros pasos en la creación de temas WordPress? Léelo desde el principio y empieza a desarrollar algo maravilloso!

1. [Introducción Al Desarrollo De Temas WordPress](/2015/02/aprende-a-hacer-un-tema-en-wordpress/)
2. [Desarrollando El Conocimiento De Temas](/2015/02/desarrollando-el-conocimiento-de-temas/)
3. [Herramientas Para El Desarrollo De Temas](/2015/02/herramientas-para-el-desarrollo-de-temas/)
4. [Creando Una Estructura HTML De Un Tema](/2015/03/creando-una-estructura-html-de-un-tema-wordpress/)
5. [Plantillas Y Estructura De Carpetas](/2015/05/plantillas-y-estructura-de-carpetas-en-wordpress/)
6. [Estableciendo Las Funciones De Tu Tema](/2015/07/estableciendo-las-funciones-de-tu-tema-wordpress/)
7. [Seguridad Para Tu Tema WordPress](/2015/07/seguridad-para-tu-tema-wordpress/)
8. [La Plantilla De Header De Un Tema WordPress](/2015/07/la-plantilla-de-header-de-un-tema-wordpress/)
9. [La Plantilla Inicio](/)
10. [Las Plantillas Entrada, Adjunto Y 404](/)
11. [La Plantilla Comentarios](/)
12. [Las Plantillas Búsqueda Y Página](/)
13. [La Plantilla Archivo](/)
14. [Las Plantillas Sidebar Y Pie](/)
15. [Resetear-Reconstruir El CSS Del Tema Y Definir Tus Diseños](/)
16. [Fondo Y Cabecera Personalizados](/)
17. [Publicando Tu Tema WordPress](/)

Es posible que alguno de los enlaces no funcione debido a que el artículo aún no haya sido escrito. No pares de visitar esta página para enterarte de sus actualizaciones.

_**Nota:** Tanto este como los demás artículos del tutorial se han elaborado con la referencia de: [The ThemeShaper WordPress Theme Tutorial: 2nd Edition](http://themeshaper.com/2012/10/22/the-themeshaper-wordpress-theme-tutorial-2nd-edition/) propiedad de [AUTOMATTIC](http://automattic.com/)._

<!--kg-card-end: markdown-->
