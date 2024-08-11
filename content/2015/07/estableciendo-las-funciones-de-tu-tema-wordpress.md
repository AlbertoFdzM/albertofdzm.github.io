---
title: Estableciendo Las Funciones De Tu Tema WordPress
date: 2015-07-08
lastmod: 2016-01-11
tags:
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

Ahora que ya has establecido la estructura de ficheros, ahora toca llenarlos de código!

Primero, vas a añadir un par de funciones PHP a nuestro tema. Estas funciones te van a servir para varias cosas:

- Añadir funcionalidades integradas en WordPress como la personalización de fondos, cabeceras, formatos de entradas, etc.
- Setear valores por defecto para el tema
- Actuar como “contenedores” de código que podrás re-usar a los largo y ancho de tu tema WordPress

## Archivos Que Crearás Y Editarás En Este Punto

- `functions.php`
- `inc/template-tags.php`
- `inc/tweaks.php`

Si eres un novatillo en PHP (o en programación en general), entonces piensa que una función es como una “máquina” que desempeña una tarea específica, sea dónde sea que la necesitemos, una función se define así:

```php
function mi_funcion() {
  // contenido de la función
}
```

Te vas a hartar de hacer funciones así que [si aún no sabes programar como mínimo en PHP ya puedes ir “empollando”](http://www.codecademy.com/es/tracks/php-clone).

## Fichero `functions.php`

Vamos al lío! Con los archivos que creamos en la [última lección](/2015/05/plantillas-y-estructura-de-carpetas-en-wordpress/), abre el archivo `functions.php` y arriba del todo pon lo siguiente:

```php
<?php
/**
 * The First Pixel funciones y definiciones
 *
 * @package The First Pixel
 * @since The First Pixel 0.0
 */
```

Básicamente lo que acabas de hacer es documentar un poco tu código para que, cuando a tus nietos les quieras enseñar lo que hiciste, te puedas acordar de para que servía este archivo. Puedes informarte mejor sobre [cómo documentar tú código en Codex de WordPress](https://make.wordpress.org/core/handbook/inline-documentation-standards/php-documentation-standards/).

### `$content_width`

`$content_width` se trata de una variable de ámbito global encargada de definir el ancho máximo del contenido (como por ejemplo las imágenes que subas) en tu tema. Previene la subida de imágenes kilométricas que puedan sobrepasar el área del contenido principal de la página. Lo más coherente es setear el valores de `$content_width` a la anchura que vaya a tener la sección de tu contenido. Acuérdate del HTML que definiste anteriormente, este área es el `div` que tiene el ID “content”. Más adelante, mediante CSS tocarás la anchura de ese `div`, pero no ahora. Así que de momento setea esta propiedad a `640px` de ancho y revísala más adelante, cuando estés con el CSS.

De nuevo, en tu fichero `functions.php` vas a escribir un par de lineas debajo de las que ya tienes:

```php
/**
 * Fija el ancho del contenido basado en el diseño del tema y los estilos.
 *
 * @since The First Pixel 0.0
 */
 function the_first_pixel_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'the_first_pixel_content_width', 640 );
 }
 add_action( 'after_setup_theme', 'the_first_pixel_content_width', 0 );
```

Te explico, se define la función que setea `content_width`, y se acopla a un “punto de anclaje” o “acción”, en este caso a `after_setup_theme`, lo que hace que la función se ejecute en un momento determina durante la carga de wordpress. Tu función también ejecuta un [“filtro”](https://codex.wordpress.org/es:Plugin_API#Filtros) por si los temás hijos/plugins quieren sobreescribir el valor.

Pues ya tienes la propiedad `$content_width` seteada!

### `the_first_pixel_setup()`

Bien, es hora de crear una función que defina los valores por defecto de tu tema y registra algunas funcionalidades extra de WordPress. Después de haber definido `$content_width` añade un par de lineas más:

```php
if ( ! function_exists( 'the_first_pixel_setup' ) ):
/**
 * Setea los valores por defecto y activa varias funcionalidades de WordPress
 *
 * Nótese que esta función se ejecuta en el gancho `after_setup_theme`,
 * que es llamado antes que el de `init`, el cual se ejecuta demasiado
 * tarde como para definir alguna de las funcionalidades, como la de indicar
 * el uso de thumbnails
 *
 * @since The First Pixel 0.0
 */
function the_first_pixel_setup() {

  /**
   * Etiquetas personalizadas para este tema
   */
  require( get_template_directory() . '/inc/template-tags.php' );

  /**
   * Funciones personalizadas que actúan independientemente
   * de las plantillas de tema
   */
  require( get_template_directory() . '/inc/tweaks.php' );

  /**
   * Permite que el tema se pueda traducir
   * Las traducciones pueden almacenarse en el directorio `/languages/`
   * Si estás construyendo tu tema a partir de The First Pixel, usa
   * buscar y reemplazar para sustituir 'the-first-pixel' por le nombre
   * de tu tema en todos los archivos del tema
   */
  load_theme_textdomain( 'the-first-pixel', get_template_directory() . '/languages' );

  /**
   * Añade por defecto un link al feed RSS en la Cabecera
  */
  add_theme_support( 'automatic-feed-links' );

  /**
   * Permite el formato "minientrada" para las entradas
   */
  add_theme_support( 'post-formats', array( 'aside' ) );

  /**
   * Este tema hace uso de `wp_nav_menu()` en un lugar
   */
  register_nav_menus( array(
    'primary' => __( 'Menú Principal', 'the-first-pixel' )
  ) );
}
endif; // the_first_pixel_setup
add_action( 'after_setup_theme', 'the_first_pixel_setup' );
```

El código está bastante documentado, así que espero que no te hayas quedado con muchas dudas.

Estás importando dos ficheros que se encuentran en el directorio de `/inc`, que son `template-tags.php` y `tweaks.php`. Un par de lineas más abajo vas a tener que trastear con ellos, no te preocupes.

Después de eso, se está llamando a la función `load_theme_textdomain()`. Está función se encarga de decirle a WordPress que este tema es valido para traducciones y que dichas traducciones se encuentran en la carpeta de `/languages`. Siempre que hagas un tema de WordPress, tienes que intentar que todo lo que escribes y se vaya a mostrar en el tema es traducible. Nunca se sabe cuando te harás famoso y miles de personas en todo el mundo querran u sarlo. En otra lección te hablaré de las traducciones, pero si te pica la curiosidad puedes visitar la [sección de I18n para desarrolladores de WordPress](https://codex.wordpress.org/I18n_for_WordPress_Developers).

Muy bien, las siguientes dos funciones son las encargadas de activar funcionalidades chulas a WordPress. La primera añade un link al feed RRS y la siguiente activa el [formato de entrada](http://codex.wordpress.org/es:Formatos_de_Entrada) de “minientrada”. La última función registra una posición para un [menú de navegación](http://codex.wordpress.org/Navigation_Menus), la cual tendrás que usar más adelante.

Y tal y como has hecho antes se registra la función contra una “acción”, de nuevo `after_setup_theme`.

## `template-tags.php` Y `tweaks.php`

Aja! estos son los archivos que la función `the_first_pixel_setup()` estaba importando.

Muy bien, ahora lo que toca es crear estos dos archivos (`template-tags.php` y `tweaks.php`) en la carpeta de `/inc`. La razon de estos archivos es conservar el código del fichero `functions.php` limpio y no muy grande, además de está manera consigues tener una organización mucho más “modular” del tema WordPress.

### `template-tags.php`

Antes dque empieces a cacharrear con el archivo, debes saber que es un `template-tag` de WordPress.

Un `template-tag` en WordPress es el término usado para referirse a las etiquetas dinámicas. Con etiqueta dinámica me refiero a algo como lo que definiste en la lección anterior, como por ejemplo `get_footer()`, este tipo de functión/etiqueta lo que hace es desplegar un código en concreto allá dónde la posiciones, lo que permite la reutilización de código e impide que tengamos código repetido por todas partes.

Más adelante se abordará más en profundidad este tema, no te preocupes, vamos con el archivo:

```php
<?php
/**
 * Etiquetas personalizadas para este tema
 *
 * @package The First Pixel
 * @since The First Pixel 0.0
 */
```

### `tweaks.php`

Las funciones que vas a posicionar en este fichero no tienen nava que ver con las “template-tags”. En vez de esom aquí iran las funciones encargadas de “Mejorar” funcionalidades ya existentes en WordPress. Básicamente se encargarán de añadir “genialidad” a tu tema WordPress.

```php
<?php
/**
 * Funciones personalizadas que actúan independientemente de las plantillas de tema
 *
 * @package The First Pixel
 * @since The First Pixel 0.0
 */
```

Y ahora la chicha, pon esto a continuación:

```php
/**
 * Hace que la función `wp_nav_menu()`/`wp_page_menu()`, muestre un
 * link a la página de inicio
 *
 * @since The First Pixel 0.0
 */
function the_first_pixel_page_menu_args( $args ) {
  $args['show_home'] = true;
  return $args;
}
add_filter( 'wp_page_menu_args', 'the_first_pixel_page_menu_args' );

/**
 * Añade clases personalizdas al array de clases del body
 *
 * @since The First Pixel 0.0
 */
function the_first_pixel_body_classes( $classes ) {
  // Añade la clase group-blog a los blogs con más de 1 autor
  if ( is_multi_author() ) {
    $classes[] = 'group-blog';
  }

  return $classes;
}
add_filter( 'body_class', 'the_first_pixel_body_classes' );

/**
 * Filtra un link contra un ID del contenido para los enlaces de siguiente/anterior
 * en los adjuntos de imágenes
 *
 * @since The First Pixel 0.0
 */
function the_first_pixel_enhanced_image_navigation( $url, $id ) {
  if ( ! is_attachment() && ! wp_attachment_is_image( $id ) )
    return $url;

  $image = get_post( $id );
  if ( ! empty( $image->post_parent ) && $image->post_parent != $id )
    $url .= '#main';

  return $url;
}
add_filter( 'attachment_link', 'the_first_pixel_enhanced_image_navigation', 10, 2 );
```

La primera función `the_first_pixel_page_menu_args()`, se encarga/asegura de que siempre haya un link a la página de incio en tus menús.

La segunda función, `the_first_pixel_body_classes()` no tiene mucho más que explicar, pero simplemente añadirá la clase `group-blog` cuando se acceda a un blog con multiples autores.

Y la última, y no por ello menos importante, `the_first_pixel_enhanced_image_navigation()` se encarga de que el usuario no tenga que hacer scroll abajo cada vez que cambie a la imagen siguiente/anterior, ya que lo posicionará a la altura del contenido.

Y eso es todo para nuestro archivo de `tweaks.php`

Madre! Que tupa a desarrollar. Espero que te haya gustado!

## Índice del Tutorial de Desarrollo de Temas WordPress

¿Preparado para dar tu primeros pasos en la creación de temas WordPress? Léelo desde el principio y empieza a desarrollar algo maravilloso!

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
