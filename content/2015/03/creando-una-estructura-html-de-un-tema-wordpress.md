---
title: Creando La Estructura HTML De Un Tema WordPress
date: 2015-03-31
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

Ahora es cuando empiezas a **meterle mano a WordPress**.

## El Fin De Cualquier Estructura HTML

Cuando desarrolles una web, debes tener en cuenta 2 metas: poco código y que este sea autodefinido (Te recomiendo seguir los principios [KISS](http://es.wikipedia.org/wiki/Principio_KISS) y [DRY](http://es.wikipedia.org/wiki/No_te_repitas)). Que viene a ser, utilizar tan poco marcado (tags HTML) como sea posible y asegurarse de que el marcado sea autodefinido mediante el uso de clases semánticas y nombres en los IDs que hagan referencia a su contenido, no a “como se ve” el mismo (class=”widget-area” en lugar de class=”sidebar-left”).

Ahora, cuando desarrolles un Tema de WordPress (o cualquier otro tema o plantilla para cualquier otro CMS) tiene que haber un balance entre poco marcado, con una estructura muy pequeña, y lo que se llama [Divitis](http://www.456bereastreet.com/lab/web_development_mistakes/); añadir demasiados `div` innecesarios al código. En otras palabras, demasiada estructura sin definición adecuada. Seguramente ya conozcas el tag `div` antes si ya conoces el lenguaje HTML o sí ya has analizado el código de alguna página con WordPress. Se trata de contenedores HTML, contenedores muy útiles para aplicar estilos CSS, pero sin ningún significado de relevancia. Obviamente vas a utilizar unos cuantos. Pero no querrás tener demasiados o algunos que carezcan de sentido.

HTML 5 ha dado un gran paso en lo que respecta el significado del marcado haciendo mucho más fácil la estructuración del HTML con tags como el `header`, `nav`, `main`, `aside`, `footer` y muchos otros. Estos nuevos elementos son similares al `div` en lo que respecta a que pueden actuar como contenedores HTML. Pero al mismo tiempo, y al contrario que un `div`, estos tags proveen de significado a tu HTML.

Esencialmente, lo que más te va a interesar es tener una estructura básica, usando los nuevos tag HTML5 así como los `div`, que puedas reutilizar o reciclar con **varios** temas. Vas a querer tener unos cimientos que te sirvan de guía la próxima vez que empieces de cero.

## La Estructura HTML Para Tu Tema WordPress

Echa un vistazo a la estructura HTML que vas a usar dentro del `body` de tu Tema WordPress:

```html
<div id="page" class="hfeed site">
  <header id="masthead" class="site-header" role="banner">
    <hgroup class="site-branding"></hgroup>
    <!-- .site-branding -->
    <nav id="site-navigation" class="main-navigation" role="navigation"></nav>
    <!-- #site-navigation -->
  </header>
  <!-- #masthead -->

  <div id="content" class="site-content">
    <div id="primary" class="content-area">
      <main id="main" class="site-main" role="main"></main>
      <!-- #main -->
    </div>
    <!-- #primary -->

    <aside id="secondary" class="widget-area" role="complementary"></aside>
    <!-- #secondary -->

    <aside id="tertiary" class="widget-area" role="complementary"></aside>
    <!-- #tertiary -->
  </div>
  <!-- #content -->

  <footer id="colophon" class="site-footer" role="contentinfo">
    <div class="site-info"></div>
    <!-- .site-info -->
  </footer>
  <!-- #colophon -->
</div>
<!-- #page -->
```

Actualmente, esta estructura HTML proviene de las bases de **\_s**. Cópiate este código en tu editor de texto y guárdalo en algún lugar para que lo tengas a mano. Lo vas a usar más adelante cuando tengas que montar la estructura de archivos de tu tema. Pero antes, vamos a repasar un par de cosas.

## Una Vista Rápida Al HTML De Tu Tema WordPress

![Estructura HTML De Un Tema WordPress](/old-posts-images/2015/03/04-Creando_Una_Estructura_HTML_De_Un_Tema_WordPress.png)

Vista de una muestra de la estructura HTML.

Echa un ojo a la imagen de estructura HTML de más arriba. Cuando más oscuro sea el bloque, más anidado significa que está. El posicionamiento de estos bloques está definido en su mayoría por CSS, el cual abordarás más adelante.

También puedes modificar la estructura HTML para que se adapte a tus necesidades o gustos. Por ejemplo, puede cambiar la navegación (`nav`) y moverla fuera del bloque de cabecera (`header`), o cambiar una de las áreas de widgets (`aside`) al pie de página (`footer`). Para este tutorial yo voy a utilizar esta estructura HTML en las futuras lecciones, y cuando llegue el momento, te expondré el uso de CSS para posicionar las distintas áreas.

Muy bien, te voy a hablar un poco sobre el código que has visto.

Primero, las clase del `div#page`, _hfeed_. Forma parte del [esquema de Microformatos hAtom](http://microformats.org/wiki/hatom). En otras palabras, al usar esta clase _hfeed_ en tu página estás indicando a cualquier máquina que lea tu web (como motores de búsqueda u otros servicios) que tu web publica contenido organizado, como entradas de blog. Vas a ver un montón de clases como esta a medida que continúes tu lectura.

Si te has percatado al revisar el código HTML, habrás visto que se están usando tags de estándar HTML5. Estos tags se encargan de identificar las diferentes secciones en un documento HTML. Si quieres que tu tema WordPress sea fácilmente accesible e indexable es importante que prestes atención en las estructuras y atributos que utilizan durante el desarrollo.

También debes prestar atención a los **atributos ARIA “role”** que se han añadido en la estructura de tags HTML. Estos atributos ayudan en gran medida a que la web sea navegable usando tecnologías asistivas. Si quieres saber más acerca de **A11y (accesibilidad)** puedes consultar la [Guía Breve de Accesibilidad Web](http://w3c.es/Divulgacion/GuiasBreves/Accesibilidad) que ha publicado el W3C.

Si echas un vistazo al área principal de la estructura, notarás que la sección de widgets está situada **después** del contenido. También verás que el contenido está englobado dentro de un `div` (con la clase `content-area`). Estos son puntos clave. No sólo te permite situar el contenido antes que las sidebars de cara a los motores de búsqueda (Y lectores de pantalla), si no que también te permite cambiar su posición con respecto al contenido mediante reglas CSS utilizando margenes negativos.

Esta estructura HTML es la base para tu Tema WordPress y te va a dar la oportunidad de hacer maravillas con CSS. Buen provecho.

## Índice del Tutorial de Desarrollo de Temas WordPress

¿Preparado para dar tu primeros pasos en la creación de temas WordPress? Léelo desde el principio y empieza a desarrollar algo maravilloso!

1. [Introducción Al Desarrollo De Temas WordPress](/2015/02/aprende-a-hacer-un-tema-en-wordpress/ "Aprende A Hacer Un Tema En WordPress")
2. [Desarrollando El Conocimiento De Temas](/2015/02/desarrollando-el-conocimiento-de-temas/ "Desarrollando El Conocimiento De Temas")
3. [Herramientas Para El Desarrollo De Temas](/2015/02/herramientas-para-el-desarrollo-de-temas/ "Herramientas Para El Desarrollo De Temas")
4. [Creando Una Estructura HTML De Un Tema](/)
5. [Plantillas Y Estructura De Carpetas](/)
6. [Estableciendo Las Funciones De Tu Tema](/)
7. [Seguridad Para Tu Tema WordPress](/)
8. [La Plantilla Cabecera](/)
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
