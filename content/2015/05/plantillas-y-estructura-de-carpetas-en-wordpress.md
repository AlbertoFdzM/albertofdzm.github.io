---
title: Plantillas Y Estructura De Carpetas En WordPress
date: 2015-05-30
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

**El tema más minimalista de WordPress** simplemente necesitaría los archivos `index.php` y `style.css` (o simplemente el style si de un tema hijo se tratara) pero tranquilo, no te vas a quedar sólo con el solar y el felpudo, vas a abordar muchos más archivos que te permitan aprovechar al máximo el potencial de WordPress.\
![Estructura de Directorios y Archivos en WordPress](/old-posts-images/2015/05/05-Estructura_De_Directorios_Y_Ficheros.png)

Vas a empezar por crear una estructura de ficheros y directorios dentro de la carpeta `wp-content/themes` de tu instalación de WordPress.

Todos los archivos estarán contenidos en una sola carpeta dentro de la carpeta que te he indicado antes, en este caso yo la he llamado "the-first-pixel" (Ojito con los espacios), puedes crear los archivos en blanco, no te preocupes, más a delante les metes el relleno.

Recuerda que el tema que estamos desarrollando se basa en la estructura y código del tema [\_s](http://underscores.me/).

Es un coñazo generar todos estos archivos vacíos, pero vas a tener que hacerlo si quieres aprender... o puedes [bajarlos de aquí](/old-posts-images/2015/05/the-first-pixel.zip).

Abre el fichero `style.css`. Este fichero se encarga, a parte de darle estilos al tema, de indicar a WordPress los datos del tema. Debes introducir la siguiente información (Yo he puesto los datos relevantes a mi tema, pero eres libre de introducir otros):

```php
/*
Theme Name: The First Pixel
Theme URI: http://onlythepixel.com/
Author: Alberto Fernandez
Author URI: http://onlythepixel.com/
Description: The First Pixel no es nada más que un tema sacado de las bases de Underscore y utilizado para la enseñanza en http://onlythepixel.com/
Version: 0.0
License: GNU General Public License
License URI: license.txt
Tags: light, white, one-column, two-columns, left-sidebar, right-sidebar, flexible-width, custom-backgroud, custom-header, custom-menu, featured-images, flexible-header, microformats, post-formats, rtl-language-support, threaded-comments, translation-ready
Este tema, como WordPress, está bajo la licencia GPL.
Úsalo para hacer cosas chulas, divertirte, y compartir lo que has aprendido con los demás.
*/
```

Te voy a comentar un poco por encima de que trata cada propiedad:

- _Theme Name:_ El nombre del tema.
- _Theme URI:_ La URL the la web del tema, si es que la tiene, aquí podría ir la URL a dicho tema en el catálogo de temas de WordPress.
- _Author:_ El/los autor/es del tema.
- _Author URI:_ La URL a la web del autor.
- _Description:_ Una pequeña descripción que defina tu tema.
- _Version:_ La versión que tiene tu tema. Este dato lo decides y gestionas tú, cada vez que publiques una nuevas versión o hagas cambios deberías actualizar estos numeritos.
- _License:_ La licencia a la que se aco, ojito aquí, porque WordPress viene con licencia GPL lo que obliga a que cualquier producto derivado (incluido tu tema) se distribuya bajo la misma licencia.
- _License URI:_ La URL en la que puede consultarse la licencia indicada. Aquí he puesto una referencia al archivo `license.txt`.
- _Tags:_ Aquí puedes indicar diferentes términos separados por comas que definan las cualidades de tu tema. Estos datos luego ayudarán a los usuarios a encontrar tu tema en el Disrectorio de Temas de WordPress.

_**Nota:** Todos estos datos son un tanto opcionales, en realidad lo único que necesitas para que tu tema comience a funcionar es la propiedad **Theme Name**._

Una vez hayas guardado el archivo `styles.css` acude a la zona de admin de WordPress y activa tu tema. Has hecho una alucinante página en blanco.

## Montando Tu Estructura HTML

Ahora vas a montar la estructura HTML del tema, como te he comentado antes en realidad lo único que necesitas es el archivo `index.php` y el `style.css`. Pero la respuesto a por qué no lo vas a hacer así es sencilla, porque queremos hacer cosas reutilizables, recuerda, reciclar es importante, y mucho más si es tu tiempo lo que se ahorra.

Tener tantos archivos te va a ayudar a "partir" cada porción de la web en pequeños pedacitos que luego podrás ir usando con diferentes casuisticas. Y lo mejor de todo, es que encajarán perfectamente.

### header.php y footer.php

De la cabeza a los pies, en las lecciones anteriores generaste un códgio HTML con la estructura básica, copia todo desde la primera linea hasta `<div id="content" class="site-content">`, esta incluida y copialo en `header.php`, que viene a ser esto:

```php
<div id="page" class="hfeed site">

  <header id="masthead" class="site-header" role="banner">
    <hgroup class="site-branding">
    </hgroup><!-- .site-branding -->
    <nav id="site-navigation" class="main-navigation" role="navigation">
    </nav><!-- #site-navigation -->
  </header><!-- #masthead -->

  <div id="content" class="site-content">
```

Y ahora, en el archivo `footer.php` copia desde `</div><!-- #content -->` hasta el final:

```php
</div><!-- #content -->

<footer id="colophon" class="site-footer" role="contentinfo">
  <div class="site-info">
  </div><!-- .site-info -->
</footer><!-- #colophon -->

</div><!-- #page -->
```

### sidebar.php

Sigue con el sidebar, en `sidebar.php` copia:

```php
<aside id="secondary" class="widget-area" role="complementary">
</aside><!-- #secondary -->

<aside id="tertiary" class="widget-area" role="complementary">
</aside><!-- #tertiary -->
```

### index.php

Ahora le toca a `index.php` con el siguiente código:

```php
<div id="primary" class="content-area">
  <main id="main" class="site-main" role="main">
  </main><!-- #main -->
</div><!-- #primary -->
```

O dios mío, acabas de descuartizar tu bonito HTML, ahora necesitarás usar un poquito dle pegamento de WordPress para reensablar las piezas a la manera WordPress.

Para empezar estos archivos no se juntan magicamente, debes invocar a una serie de funciones que provee WordPress para que todo epmiece a funcionar. Al comienzo del archivo `index.php`, antes de todo el código, añade la siguiente linea:

```php
<?php get_header(); ?>
```

Fenómeno, ahora vete al final del mismo archivo y añade las siguiente lineas:

```php
<?php get_sidebar(); ?>
<?php get_footer(); ?>
```

Aja! ahí está tu primera ensamblación de piezas para hacer una vista en WordPress, ya tienes el archivo principal que WordPress mostrará (`index.php`) junto con pequeñas partes reutilizables.

Puedes comprobar que dichos cambios funcionan recargando en navegador tu WordPress con tu tema activado e inspeccionando el código HTML de la página en la página principal.

Este es el camino para empezar a hacer temas a punta pala.

## Índice del Tutorial de Desarrollo de Temas WordPress

¿Preparado para dar tu primeros pasos en la creación de temas WordPress? Léelo desde el principio y empieza a desarrollar algo maravilloso!

1. [Introducción Al Desarrollo De Temas WordPress](/2015/02/aprende-a-hacer-un-tema-en-wordpress)
1. [Desarrollando El Conocimiento De Temas](/2015/02/desarrollando-el-conocimiento-de-temas)
1. [Herramientas Para El Desarrollo De Temas](/2015/02/herramientas-para-el-desarrollo-de-temas)
1. [Creando Una Estructura HTML De Un Tema](/2015/03/creando-una-estructura-html-de-un-tema-wordpress)
1. [Plantillas Y Estructura De Carpetas](/2015/05/plantillas-y-estructura-de-carpetas-en-wordpress)
1. [Estableciendo Las Funciones De Tu Tema](/2015/07/estableciendo-las-funciones-de-tu-tema-wordpress)
1. [Seguridad Para Tu Tema WordPress](/2015/07/seguridad-para-tu-tema-wordpress)
1. [La Plantilla De Header De Un Tema WordPress](/2015/07/la-plantilla-de-header-de-un-tema-wordpress)
1. [La Plantilla Inicio](/)
1. [Las Plantillas Entrada, Adjunto Y 404](/)
1. [La Plantilla Comentarios](/)
1. [Las Plantillas Búsqueda Y Página](/)
1. [La Plantilla Archivo](/)
1. [Las Plantillas Sidebar Y Pie](/)
1. [Resetear-Reconstruir El CSS Del Tema Y Definir Tus Diseños](/)
1. [Fondo Y Cabecera Personalizados](/)
1. [Publicando Tu Tema WordPress](/)

Es posible que alguno de los enlaces no funcione debido a que el artículo aún no haya sido escrito. No pares de visitar esta página para enterarte de sus actualizaciones.

_**Nota:** Tanto este como los demás artículos del tutorial se han elaborado con la referencia de: [The ThemeShaper Wororial: 2nd Edition](https://themeshaper.com/2012/10/22/the-themeshaper-wordpress-theme-tutorial-2nd-edition/) propiedad de [AUTOMATTIC](http://automattic.com/)._
