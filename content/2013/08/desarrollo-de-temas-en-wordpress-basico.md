---
title: Desarrollo de Temas en WordPress - Básico
date: 2013-08-27
lastmod: 2016-01-11
tags:
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

En esta página encontrarás los primeros pasos necesarios para comenzar a **desarrollar temas de WordPress**. Indicar que se intentará seguir en todo momento los **[standars establecidos](http://make.wordpress.org/core/handbook/coding-standards/ "Standars de desarrollo para WordPress") en el manual de WordPress para le desarrollo de temas**.

entiendo que estás leyendo esto porque tus conocimientos sobre el uso de WordPress son por lo menos medios o avanzadas y más o menos comprendes le funcionamiento de los temas y los plugins en WordPress. Si lo dicho anteriormente no es así, te recomiendo que antes de comenzar con esta sección intentes informarte mejor sobre estos temas antes de empezar en área.

Empezamos.

## Introducción

Creo que la manera más sencilla de que aprendas como va todo este cotarro de implantar estilos y funcionalidades que ayudaran a tu web a ser aún más única e irreemplazable es la práctica, el ensayo y error y picar, picar tecla con todo lo que se explique, porque así se arraigaran mucho mejor todos los conocimientos que se den de aquí en adelante. Así pues intentaré dotar a todas las explicaciones y temas que exponga de una porción de código o una demo con la que puedas practicar, jugar y experimentar.

A parte, no vamos a empezar directamente abordando los temas de WordPress si no que comenzaremos por los **temas hijo**, que son un área más fácil de asimilar y de empezar a desarrollar con la que podremos ir adentrándonos en los **temas “independientes”**. Dicho esto podemos empezar con la chicha y dejarnos de parloteos.

## Temas Hijos

Básicamente un tema hijo en WordPress es un **tema que depende de otro tema** que recibe le nombre de **tema padre**. Digo depende, porque literalmente depende de otro tema, poniendo un ejemplo muy sencillo pensemos que tenemos 2 temas instalados en nuestro WordPress, los vamos a llamar tema *Only* (tema padre) y el tema *Pixel*  (tema hijo del tema Only). Este primero lo único que necesita para funcionar es que WordPress esté instalado, sin embargo, el tema Pixel necesita que el WordPress sobre el que instalemos el tema tenga a parte también instalado el tema Only, si este último no se encuentra instalado en nuestro WordpPress nuestro tema hijo no funcionará.

Todo lo explicado anteriormente es básicamente porque le tema hijo hereda todas la funcionalidades y estilos que tiene el tema padre. Dicho esto vamos a realizar una practica para asentar bien estos conocimientos, para ello necesitaremos lo siguiente:

- [WordPress](http://wordpress.org/ "WordPress") 3.6 o superior instalado
- Tema [Twenty Thirteen](http://wordpress.org/themes/twentythirteen "Tema Twenty Thirteen") instalado

Vamos a elaborar los archivos de base para que un tema hijo para Twenty Thirteen pueda funcionar en WordPress. Esto es muy sencillo, ya que el único archivo necesario para crear un tema hijo es la **hoja de estilos (CSS)**, que a su vez contendrá información relevante como el nombre del tema, el autor, una descripción corta, etc. El nombre de nuestra hoja de estilos debe ser _style.css_ ya que WordPress reconoce este nombre de archivo para recoger los datos de nuestro tema y darlo de alta así en nuestro WordPress. De este modo la estructura de ficheros de nuestro tema hijo será la siguiente:

- /aprendewordpress
- style.css

Y nuestro archivo **style.css** contendrá lo siguiente:

```php
/*
Theme Name:     Aprende WordPress
Template:       twentythirteen
*/
```

Muy simple verdad, bien, pues si la carpeta **aprendewordpress** la posicionas en la siguiente ruta de tu WordPress:

- /wp-content
- /themes

Dicho tema aparecerá para ser utilizado en tu WordPress, claro que en este caso, al no contener nada, lo único que hará será sobrescribir los estilos del tema Twenty Thirteen y establecer los suyos, que es lo mismo que dejar tu página sin estilos. A parte de esto también heredará las funcionalidades del tema Twenty Thierteen, como sus plantillas de páginas, estructuras, menús, etc.

Espero que esta sencilla explicación de como empezar a crear temas (temas hijo) para WordPress te haya resultado útil. ¿Dudas? Comenta sin miedo.

<!--kg-card-end: markdown-->
