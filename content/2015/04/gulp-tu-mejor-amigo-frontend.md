---
title: Gulp - Tu Mejor Amigo FrontEnd
date: 2015-04-02
lastmod: 2024-08-11
tags:
  - GulpJS
  - NodeJS
---

![GulpJS Logo](/old-posts-images/2015/04/gulp.png)

En otro momento ya hablé sobre las [utilidades que tiene NodeJS en el desarrollo FrontEnd](/2015/03/desarrollo-web-con-node-basiquisimo) abordando lo más básico, hoy vas a leer acerca de una **herramienta** que te va a facilitar la vida en lo que se refiere a desarrollo web. Esta utilidad es [**Gulp**](http://gulpjs.com/).

## Qué es Gulp?

Se trata de una utilidad desarrollada sobre NodeJS para la **automatización y gestión de tareas** tales como validación de JS o CSS, minificado, concatenado, parseo, ofuscación de código y un largo etcétera.

![Gulp 7-Eleven](/old-posts-images/2015/04/gulp-7-eleven.jpg)

No sé exactamente de dónde sale el nombre y la imagen que lo define, por curiosidad y rebuscando un poco he llegado a la conclusión de que podría hacer alusión a una marca de máquinas expendedoras de refrescos perteneciente a [7-Eleven](http://es.wikipedia.org/wiki/7-Eleven), claro que en este caso no tienen nada que ver… ¿O sí…?

### Entubando al Jabalí

Antes de ensuciarte las manos tienes que saber que **GulpJS** es el competidor directo de [**GruntJS**](http://gruntjs.com/), que no es nada más lejos que otra utilidad con la misma finalidad.

Las **diferencias más importantes entre GruntJS y GulpJS** son los métodos usados para el procesamiento de archivos:

- GruntJS procesa los archivos de tal manera que, en cadenas de procesamiento con varios puntos, se genera un archivo temporal a partir del primer proceso cogiendo el archivo original, este archivo temporal es recogido por le segundo proceso y así hasta la finalización de la cadena de procesado donde se genera un archivo resultante. Normalmente las configuraciones de GruntJS se definen desacopladas de las tareas.
- GulpJS procesa los archivos por medio de métodos `pipe()` similares a [los que usa NodeJS](https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options) para el procesado de [**Streams**](http://es.wikipedia.org/wiki/Streaming), de está manera se procesa el archivo por **Streaming** (No se genera ningún archivo temporal) y ese _flujo de datos_ va pasando por los procesos definidos en la tarea de procesado del archivo y descargándose en un archivo final. Normalmente las configuraciones de GulpJS se definen en la misma tarea.

![BowerJS vs GulpJS](/old-posts-images/2015/04/BowerJS-vs-GulpJS.jpeg)

En mi opinión, a primera vista, **GulpJS es más facil de leer y entender que GruntJS**, pero para gustos colores. **GruntJS tiene más plugins que GulpJS** por otro lado.

## Instalación de GulpJS

Antes de empezar deberías tener unos conocimientos mínimos sobre **desarrollo en Node** y la **gestión de proyectos y paquetes con NPM**.

Previamente necesitas tener Node instalado en tu sistema. Te recomiendo instalar Gulp con Node de manera global mediante el siguiente comando:

```bash
npm install -g gulp

// Y una vez tenemos Gulp instalado puedes comprobarlo con
gulp -v
```

Ya podemos empezar a trastear!

## Primeros Vasos

Create un directorio (que será tu proyecto de pruebas) y llámalo por ejemplo `learn-gulp`, acto seguido sitúate con la consola en ese directorio e indica que Gulp es una dependencia de desarrollo (Se trata de operativa de proyectos con NPM para la definición de dependencias, que deberías conocer de antemano):

`npm install gulp --save-dev`

Y ahora elabora un fichero `gulpfile.js` con la configuración básica para Gulp, que es por lo menos importar el módulo:

```javascript
// Importo el módulo de Gulp
var gulp = require("gulp");
```

### Las Tareas De Andar Por Casa

Luego tienes que definir en tu fichero `gulpfile.js` una tarea por defecto:

```javascript
// Defino una tarea por defecto
gulp.task("default", function () {
  console.log("Hola Gulp!");
});
```

Ya puedes probar el script Gulp en consola:

```bash
gulp
[00:00:00] Using gulpfile /learn-gulp/gulpfile.js
[00:00:00] Starting 'default'...
Hola Gulp!
[00:00:00] Finished 'default' after 277 μs
```

Ojo! Que algunos ya podrían llamarte arquitecto web con sólo esto, pero no desesperes, vas camino del buen arquitecto. No te vayas, que esto no es productivo aún para nadie, añade alguna tarea más no?

```javascript
gulp.task("adios", function () {
  console.log("Adios Gulp!");
});
```

Ten cuidado no te de un ictus… Y pruébala hombre!

```bash
gulp adios
[00:00:00] Using gulpfile /learn-gulp/gulpfile.js
[00:00:00] Starting 'adios'...
Adios Gulp!
[00:00:00] Finished 'adios' after 289 μs
```

Y ahora las dos:

`gulp default adios`

_Pues na', ya e'ta to' el pejca'o vendi'o!_, que no hombre! continua que vas bien.

### Plugins En Gulp

Ya deberías tener el concepto básico de como funcionan las tareas de gulp. Ahora debes ir un paso más allá, y usar un par de procesos para procesar un archivo CSS, si no tienes ninguno puedes bajarte la [hoja de estilos de BootStrap](https://raw.githubusercontent.com/twbs/bootstrap/v3.3.4/dist/css/bootstrap.css), por ejemplo. Para esta tarea vas a necesitar usar algún que otro [Plugin de Gulp](http://gulpjs.com/plugins/).

Si no te has fijado identificar un plugin de Gulp es fácil (Todos vienen prefijados por `gulp-`). Instala estos plugins en tu proyecto de `learn-gulp`:

`npm install gulp-minify-css gulp-cssbeautify gulp-rename --save-dev`

Y ahora a implementarlos en tu código:

```javascript
// Importa el módulo de Gulp
var gulp = require("gulp"),
  // Importa los Plugins de Gulp
  rename = require("gulp-rename"),
  minifyCSS = require("gulp-minify-css"),
  cssbeautify = require("gulp-cssbeautify");
```

### Entubando Archivos con Gulp

Es hora de meterle chicha a las tareas que has definido antes (bastante chorras, por cierto) y a darles algo de funcionalidad:

```javascript
// Define una tarea por defecto
gulp.task("default", function () {
  // Recoge el archivo de CSS
  return (
    gulp
      .src("./bootstrap.css")
      // Añade un pipe para que se procese con MinifyCSS
      // y comprima el código
      .pipe(minifyCSS())
      // Y otro más con Rename para cambiar el nombre de archivo
      .pipe(rename("learn-gulp.min.css"))
      // Y coloca el archivo en la ruta indicada
      .pipe(gulp.dest("./procesados/"))
  );
});
```

Con esto si ejecutas Gulp simplemente (que es lo mismo que `gulp default`) debería generarte una carpeta llamada `procesados` con un fichero en su interior llamado `learn-gulp.min.css` y si abres dicho fichero este debería aparecer minificado (con apenas un par de líneas, y una de ellas super super larga).

Por asegurarme de que has cogido la copla, ¿Qué tal si te planteo otra tarea? esta vez será a la inversa con el plugin que falta por usar:

```javascript
// Define una tarea nueva
gulp.task("beautify", function () {
  // Esta vez indica que recoja cualquier archivo
  // que coincida con la expresión indicada
  return (
    gulp
      .src("./procesados/*.min.css")
      // Procesa el fichero con CSSBeautify
      .pipe(cssbeautify())
      // Lo Renombra
      .pipe(rename("learn-gulp.css"))
      // Lo coloca en la carpeta raíz
      .pipe(gulp.dest("./"))
  );
});
```

Y si ahora ejecutas `gulp beautify` en el raíz del proyecto verás el archivo `learn-gulp.css`, y si lo abres podrás comprobar que tiene bastantes lineas.

Esto es **lo básico de Gulp**, seguro que puedes hacer cosas muchísimo más alucinantes a partir de aquí.
