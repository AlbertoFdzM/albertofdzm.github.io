---
title: Herramientas para el Desarrollo de Temas
date: 2015-02-26
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

Antes de empezar a desarrollar ningún tema WordPress, vamos a necesitar de un lugar dónde tener nuestras herramientas de desarrollo de temas. En este artículo, recorreremos los mejores trucos y configuraciones y montaremos un entorno de testeo de Temas WordPress multiplataforma que hará que un auténtico desarrollador de Temas WordPress se sienta orgulloso.

## Servidor Local de Testeo: XAMPP, MAMP, WAMP

No hay mejor lugar para empezar a Desarrollar Temas WordPress que en tu propio ordenador. Para ello vas a necesitar convertir tu PC en un “servidor local”, básicamente un conjunto de programas que suele tener un servidor web normal (Apache, MySQL y PHP). Con esto podrás ser capaz de instalar WordPress en tu ordenador.

Instalar estos programas por separado y configurarlos puede ser complicado si no estás acostumbrado a trastear con servidores web, terminales de consola y archivos de configuración, por ello la comunidad web ha creado un gran abanico de programas que harán esto por ti.

Estés en el sistema que estés, puedes usar [XAMPP](https://www.apachefriends.org/es/index.html), si estás en un Windows puedes usar también [WAMP](http://www.wampserver.com/en/) o si te decantaste por un Mac tiene a tu disposición [MAMP](http://www.mamp.info/en/).

### Desarrollando en un Servidor Remoto

Si prefieres desarrollar en un servidor remoto, vas a necesitar un cliente FTP que te permita subir los archivos que crees y modifiques a tu servidor:

- [FileZilla](https://filezilla-project.org/)
- [CyberDuck](http://cyberduck.ch/)

## WordPress

Cómo no, vamos a necesitar la última versión de [WordPress](http://es.wordpress.org/) e instalarla correctamente en nuestro servidor de pruebas.

Si tienes algún problema con las configuraciones de servidor o la instalación de WordPress, te sugiero que _Googlees_ un poquito en busca de algún tutorial:

- [Instalar XAMPP en Windows](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=instalar%20xampp%20en%20windows)
- [Cómo instalar WordPress](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=como+instalar+wordpress)

## Contenido de Prueba

Tu WordPress va a necesitar un poco de contenido sobre le que poder testear tus obras de arte. En el panel de control o panel de administración ve a `Herramientas > Importar` y selecciona **WordPress** en la lista de opciones (Es necesario tener instalado el plugin [WordPress Importer](https://wordpress.org/plugins/wordpress-importer/), si no está instalado WordPress ofrecerá su instalación). Ahora sólo necesitamos un archivo _WXR (WordPress eXtended RSS)_ que importar.

Puedes fabricar el tuyo propio generando tú el contenido y acto seguido exportando en WordPress o puedes usar contenido ya disponible en Internet.

### Hay un par de opciones

- [Theme Unit Test Data (Recomendado)](https://wpcom-themes.svn.automattic.com/demo/theme-unit-test-data.xml)
- [WP Example Content Plugin](https://wordpress.org/plugins/wp-example-content/)
- [Contenido de prueba de WPCandy](http://wpcandy.com/articles/easier-theme-development-with-the-sample-post-collection.html)

Cada una de estas opciones tienes sus pluses y contras. Lo que puedes hacer es **añadirlos todos** y de este modo asegurarte de que cubres todas las posibles variantes con tu tema.

### Añadir un poco de contenido “real” también!

Nadie mejor que tú va a saber a **qué clase de contenido va a tener el tema que vas a desarrollar**, por lo que te recomiendo encarecidamente que generes por tu cuenta un **contenido que te sirva de apoyo**. Por ejemplo, si vas a desarrollar un tema de WordPress orientado a mostrar porciones de código lo suyo sería que tuvieras un par de posts y páginas con porciones de diferentes tipos de lenguaje o si el tema va a ir orientado a una web de fotos deberías centrarte en crear varios posts y páginas con los diferentes tipos de fotos que pueda incluir. Esto hará que cuando desarrolles tu tema te asegures de que cubres las funcionalidades que necesitas y que los estilos quedan bien.

Por otro lado también debes tener en cuenta el idioma, si tu tema va a estar en español, deberías generar un poco de contenido (posts, páginas, categorías, etc.) en español para comprobar que las fuentes y los estilos que uses son compatibles y se ven correctamente. **No dejes que _Lorem Ipsum_ elija tus estilos**.

## Guías de Desarrollo

Si estás interesado en desarrollar usando las buenas prácticas, la página [Guías de Revisión de Temas](http://codex.wordpress.org/Theme_Review) del Codex WordPress es un buen lugar donde empezar.

## Plugins Esenciales

El **Plugin por excelencia para el desarrollo en WordPress** siempre ha sido [Developer](https://wordpress.org/plugins/developer/), el cual al ser instalado nos sugiere una colección de Plugins que nos harán la vida mucho más fácil a lo largo del desarrollo de nuestro tema WordPress.

Otro muy útil es [Monster Widget](https://wordpress.org/plugins/monster-widget/), que te va a proporcionar un widget que contiene todos los widgets del core de WordPress, para poder añadiros rápidamente a tu sidebar.

## Editor de texto

No es necesario ningún editor gráfico o algún programa concreto para empezar a editar temas en WordPress, simplemente un editor de texto plano, pero claro, los hay mejores y peores.

Yo personalmente uso [Atom](https://atom.io/), en mi opinión es el editor de texto por excelencia de los desarrolladores [Front-End](http://es.wikipedia.org/wiki/Front-end_y_back-end).

## Navegador con funcionalidad de Debugging

Vas a necesitar alguno de los navegadores que hay actualmente que disponga de funcionalidad de debugging para usarlo durante el desarrollo de tu tema WordPress. [Chrome](https://www.google.es/chrome/browser/desktop/index.html), [Firefox](https://www.mozilla.org/es-ES/firefox/new/) o [Safari](https://www.apple.com/es/safari/) son algunos de los navegadores que incluyen esta funcionalidad. Yo en estos tutoriales voy a usar el de Chrome pero no creo que encuentres mayor dificultad de seguirme con los otros.

## HTML y CSS

Para llevar a cabo el **desarrollo de temas en WordPress** antes vas a necesitar tener unas bases de conocimiento medianamente solidas en lo referente a **HTML y CSS**. Si aún desconoces estos dos lenguajes puedes realizar el [Curso HTML y CSS de Codecademy](http://www.codecademy.com/es/tracks/html-css-traduccion-al-espanol-america-latina-clone) para iniciarte un poco en esos lenguajes y sobre todo buscar información por Internet acerca de ellos (que no te va a costar).

## PHP

Aunque no creo que sea estrictamente necesario que sepas **PHP**, si es muy recomendable saber un mínimo para desarrollar correctamente Temas en WordPress. A lo largo de estos tutoriales vas a poder aprender un poco, pero si tienes dudas o no consigues seguir el ritmo te recomiendo que busques algún articulo o curso sobre este lenguaje, no es por hacerle campaña a Codecademy, pero también tienes un [Curso de PHP](http://www.codecademy.com/es/tracks/php-clone) que seguro te resulta muy útil.

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

_**Nota:** Tanto este como los demás artículos del tutorial se han elaborado con la referencia de: [The ThemeShaper WordPress Theme Tutorial: 2nd Edition](http://themeshaper.com/2012/10/22/the-themeshaper-wordpress-theme-tutorial-2nd-edition/) propiedad de [AUTOMATTIC](http://automattic.com/)._
