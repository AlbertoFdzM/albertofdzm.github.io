---
title: Desarrollando el Conocimiento de Temas
date: 2015-02-10
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

## ¿Qué es el “Conocimiento de Temas”?

¿Qué es el “Conocimiento de Temas”? _El Conocimiento de Temas_ es el sentido que te permite entender los Temas WordPress: las relaciones entre los diferentes archivos que componen un tema, y como cada uno de esos archivos funcionan con WordPress. El Conocimiento de Temas es lo que vas a poseer al final de este tutorial.

## El Conocimiento de Temas no trata sobre la memorización de código

Hablemos, por ejemplo, de las matemáticas, el “conocimiento de los numero”. Si tu enseñas a un niño simplemente resultados aritméticos, cómo por ejemplo que 5+3=8 o que 2+3=5, sin ninguna referencia que le ayude a entender **el porqué de esos resultados**, el niño será incapaz de resolver otro caso que no haya estudiado. Si en lugar de esto, enseñamos los casos anteriores valiéndonos de otro tipo de referencias, como el típico ejemplo de las manzanas (si tengo 3 manzanas en una mano y 2 manzanas en la otra, tengo 5 manzanas en total), entonces, estaremos ayudando al niño a “ver” cómo funcionan los números. Entonces él podrá utilizar ese conocimiento para resolver cualquier problema con la misma índole, aún sin haber memorizado la respuesta.

El Conocimiento de Temas funciona del mismo modo. Es importante centrarse en la visión global de lo que tratas de conseguir en lugar de fracciones de código.

## ¿Cómo trabajar tu Conocimiento de Temas?

Si has leído hasta aquí, ya casi has llegado. El Conocimiento de Temas consiste en darte cuenta de lo que estás haciendo y realizar decisiones acertadas en base a ello. Por ejemplo, si yo te pidiera que diseñaras un coche, tú automáticamente ya sabrías que partes ibas a incluir en tus diseños (Motor, chapa, neumáticos, ventanas, y suma y sigue. Puede que desconozcas cómo funciona cada parte, pero si podrías explicar por que son necesarias en el diseño, y sabrías comprobar la calidad de las mismas). Tus años de experiencia conduciendo y viajando en coches te han forjado ese “Conocimiento de Coches”.

Usa un enfoque similar cuando visualices tu próximo Tema de WordPress. Algunas de las preguntas importantes que debes realizarte son: “¿Qué archivos necesito incluir en mi tema? ¿Qué función desempeñaran estos archivos? ¿Por qué voy a copiar esta porción de código en mi tema? ¿De dónde viene esta porción de código y quién la ha escrito? ¿Qué funcionalidad aplica este código? ¿Está actualizado? ¿Es seguro?”

No es necesario que entiendas toda la mecánica que hay debajo de cada linea de PHP, dado que es posible que cambie en dos, tres o cuatro versiones posteriores. Lo que es verdaderamente importante, cómo con los coches, es que entiendas que es lo que está haciendo tu Tema internamente.

Lo dicho, hay un par de cosas que puedes hacer para entrenar ese conocimiento genérico y mantener tu Conocimiento de Temas afinado.

## Saber “Qué Hay De Nuevo” en WordPress

EL código de WordPress se usa en una gran cantidad de webs. Se puede encontrar incluso en local (offline), y dentro de libros o revistas. Cuando mires a las estrellas en el cielo de la noche, estarás viendo astros que existieron millones de años atrás. De forma parecida, cuando examines una muestra de código de WordPress, esa muestra se trata de una foto de WordPress que existió en el momento en que se escribió, y que no necesariamente existirá en el WordPress actual.

Teniendo conciencia de las ultimas versiones de WordPress y de sus principales funcionalidades te ayudaran a evaluar la antigüedad de los tutoriales de WordPress, libros y plugins. Para mantenerte al día con las actualizaciones de WordPress, es recomendable que te suscribas al [Blog de Noticias de WordPress](http://wordpress.org/news/).

## Mantener el hábito de comprobar fechas

Una de las cosas que deberías hacer antes de leer ningún tutorial o copiar cualquier código es cerciorarte de la fecha de su elaboración. Recuerda lo que se indicó en Saber “Qué Hay De Nuevo” en WordPress, esto te ayudará a saber que partes del código que estás leyendo son útiles para usar en tu tema y cuales han quedado obsoletas. Como supongo que ya sabrás, es peligrosos usar código obsoleto en un tema de WordPress, dado que esto puede provocar agujeros de seguridad. El código en si no viene con una fecha de caducidad. Debes saber determinar la relevancia en cada caso.

Ten en cuenta que si usas código desactualizado en tu tema no es el fin del mundo. Hay plugins, como [Developer](http://wordpress.org/extend/plugins/developer/) y [Theme-Check](http://wordpress.org/extend/plugins/theme-check/), que te ayudaran a mantener y optimizar el desarrollo de tu tema WordPress.

Además de los plugins para desarrollador, es bueno caer en el hábito de adoptar las mejores practicas [mencionadas en Theme Security and Privacy](https://make.wordpress.org/themes/handbook/guidelines/theme-security-and-privacy/) en el Manual de Revisión de Temas de WordPress. Comprueba la guía y toma nota de todo lo que haga referencia a alguna de las funcionalidades que uses en tu tema. Por ejemplo, el artículo referente a la [validación y saneamiento de datos](http://codex.wordpress.org/Data_Validation) es necesario para proteger tu web de [ataques Cross-Site-Scripting (XSS)](http://es.wikipedia.org/wiki/Cross-site_scripting).

Una de las cosas más importantes que se nombran es especialmente recalcable ahora mismo hablando de la relevancia y antigüedad del código:

_**Los temas deben implementar páginas Opciones de Tema y Configuración de Tema, en lugar de depender de scripts copia-pega de las webs de tutoriales.**_

Los scripts copia-pega pueden volverse obsoletos muy rápido. Esto aplica no sólo al código de las opciones de Tema, si no al código de **cualquier** tutorial. Es bueno que **sepas** estar atento a la importancia de la antigüedad y mantener tu tema tan seguro que sea posible.

## Entender los elementos esenciales de los temas WordPress

La mayoría de webs, corran o no sobre un WordPress, tienen las mismas secciones genéricas: una cabecera, un contenido principal, un aside, y un pie. Puede ayudar el pensar que estas secciones son bloques (o partes de un coche, es tu elección). Algunos bloques, cómo la cabecera, el contenido, el aside y el pie, los vas a usar con todos los temas que desarrolles. Tan sólo vas a varias la forma en que se posicionan para ser útiles de cara al usuario. Con los temas de WordPress, los archivos de plantillas como header.php, index.php, sidebar.php, y footer.php son tus “bloques”. Por lo tanto, el Tema será la estructura que formes al unir estos bloques.

Tomando conciencia de estos elementos esenciales te vendrá de ayuda para desarrollar tu conocimiento de temas. Para tener una vista rápida de las partes de un tema WordPress, puedes visitar [la página de Desarrollo de Temas en el Codex de WordPress](http://codex.wordpress.org/Theme_Development#Template_Files).

## Saber dónde encontrar los últimos ejemplos de código y estándares

El [WordPress Code Reference](https://developer.wordpress.org/reference/) es un lugar genial para comenzar tu andadura buscando funciones de WordPress y etiquetas de plantillas que encuentres en los tutoriales. Si una función está obsoleta, la página del WordPress Code Reference debería indicarlo y hacer referencia a las nuevas alternativas a dicha función.

El plugin de [Log Deprecated Notices](https://wordpress.org/plugins/log-deprecated-notices/) puede escanear tu tema en busca de llamadas a funciones obsoletas, así como archivos de plantilla que ya no se usen o algún uso incorrecto de funciones.

El equipo de Review de Temas WordPress tienen [una series de requisitos](http://codex.wordpress.org/Theme_Review) que deben cumplirse para que el tema sea aprobado en el directorio gratuito de temas de WordPress.org. Evaluando tú código conforme a estos estándares te ayudará a estar un paso por delante de las buenas practicas.

Por último, cuando tengas alguna duda, hay algunos lugares dónde puedes exponerlas, como la sección de [Temas y Plantillas](http://wordpress.org/support/forum/themes-and-templates) de los foros de soporte de WordPress.org o la [base de preguntas de WordPress de StackExchange](http://wordpress.stackexchange.com/).

No se trata de siempre seguir las guías básicas para desarrollar un tema WordPress. Al contrario, la idea es que se tenga constancia de las decisiones que se toman en los cambios al desarrollar un tema WordPress y saber el porqué lo hacemos.

## Quédate con la copla

Los puntos a tener en cuenta de esta lección son:

- Toma constancia de cómo se ve WordPress actualmente
- Saber cuáles son las nuevas funcionalidades introducidas en las últimas versiones de WordPress
- Prestar atención de las fechas de los tutoriales de WordPress que se consulten así como de ejemplos de código y combinarlo con nuestro conocimiento acerca de WordPress para examinar su relevancia
- Tener en cuenta que el código cambia regularmente, pero que los bloques básicos son generalmente los mismos
- Saber perfectamente por qué estás tomando determinadas decisiones acerca del desarrollo de tu tema.

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

<!--kg-card-end: markdown-->
