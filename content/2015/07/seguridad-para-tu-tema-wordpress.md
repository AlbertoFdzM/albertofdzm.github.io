---
title: Seguridad Para Tu Tema WordPress
date: 2015-07-22
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

Y aquí va otro capitulazo de cómo crear un tema en WordPress. En los anteriores capítulos ya se han calentado motores y en este verás temitas sobre la seguridad y el saneamiento de datos. Very important!

![Seguridad en Temas WordPress](/old-posts-images/2015/07/seguridad_para_tu_tema_wordpress.jpg)

## ¿Qué Por Qué Es Importante La Seguridad En Un Tema de WordPress?

P’a matarte! la seguridad es importante en cualquier cosa que tenga que ver con el desarrollo web, en primer lugar, y hay que tener en cuenta que un Tema de WordPress lidia con muchos tipos de datos diferente y el origen de estos aún más diferente si cabe.

En la [Biblia de WordPress](http://codex.wordpress.org/Data_Validation) hay una cita que reza:

> Los datos no fiables provienen de muchas fuentes diferentes (usuarios, sitios de terceros, tu propia base de datos!, …) y todos estos necesitan ser validados tanto en su entrada como en su salida.

Lo sé, lo sé (mi propia base de datos! ya no te puedes fiar ni de tu abuela…), por esta razón debes asumir que cualquier dato que venga o vaya dentro de tu tema WordPress será un dato no fiable, inseguro, y por ello, habrá que validarlo y sanearlo acorde a su naturaleza y cometido. Esto evitará que te hagan alguna gamberrada o salvajada como inyecciones SQL, o de JavaScript, problemas de [Cross-Site Scripting (XSS)](https://es.wikipedia.org/wiki/Cross-site_scripting) y muchas burradas más.

WordPress es muy listo (y viejo) y por ello provee una serie de [funciones “mágicas” para el saneamiento y validación de datos](http://codex.wordpress.org/Data_Validation). Estás funciones ayudan a:

- Convertir caracteres especiales como las comillas simples y dobles, el símbolo de unión, los signos de mayor y menor que, etc. en sus equivalentes codificados (`"`, `<`, `&`, etc.) dado que pueden ser conflictivos al ser procesados por algunos sistemas.
- Corroborar que los datos que se están tratando son datos seguros o coherentes (por ejemplo, que un texto no contenga código HTML o que sea un email o un link).

Aquí voy a tratar el primer punto en su mayoría ya que el segundo tiene que ver con temas relacionados con la introducción de datos por parte del usuario, como las configuraciones del tema WordPress, por ejemplo.

## Saneamiento De Datos De salida

Las funciones principales que más se usaran en esta parte serán [`esc_attr()`](https://developer.wordpress.org/reference/functions/esc_attr/) y [`esc_attr_e()`](https://developer.wordpress.org/reference/functions/esc_attr_e/). Tranquilo porque hay muchas más pero vamos a ir poco a poco.

Estás dos funciones de WordPress se dedican a codificar caracteres especiales como los que te he comentado antes. Son útiles a la hora de querer imprimir texto que vaya a estar contenido en código HTML por ejemplo (en su mayoría dentro de atributos HTML). La diferencia de `esc_attr()` de su hermana con una `_e` al final es que esta última imprime el código en pantalla (como cuando ejecutamos un `echo`) y la anterior devuelve un string para que lo manipulemos en PHP.

Aquí va una ejemplo simplón!

```php
<a href="<?php the_permalink(); ?>" title="<?php echo esc_attr('Curioso pero "cierto"'); ?>"><?php the_title(); ?></a>
```

Espero que no te resulte muy complejo entenderlo, pero básicamente esto lo que va a hacer es imprimir en pantalla un link con el título de la entrada como texto y con _Curioso pero “cierto”_ como atributo de título (que es lo que aparece cuando posas unos segundos el ratón sobre el link). Lo traicionero aquí son las comillas dobles que tiene la palabra _cierto_ las cuales al pasar por la función de `esc_attr()` se van a convertir en dos bonitos `"` en nuestro código HTML (que en pantalla se verán como comillas dobles normales) evitando así que tu bonito Tema WordPress pete por algún lado.

Tranquilo porque vamos a hacer más uso de todas estas funciones a lo largo de las lecciones.

Si quieres saber más acerca de las funciones de validación y saneamiento para WordPress puedes echar un ojo a este [artículo sobre validación y Saneamiento de datos en WordPress](http://www.adrenalina.es/validacion-y-saneamiento-de-datos-en-wordpress/).

Considera esto una primera toma de contacto en seguridad para WordPress.

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
