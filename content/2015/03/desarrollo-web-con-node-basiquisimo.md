---
title: Desarrollo Web Con Node - Basiquísimo
date: 2015-03-19
lastmod: 2024-08-11
tags:
  - NodeJS
  - NPM
---

## La Vieja Escuela

Desde hace mucho tiempo, lo típico cuando desarrollabas una página **web con HTML, JS y CSS** era tener un servidor [Apache](http://httpd.apache.org/) o el _stack_ de [XAMPP](http://es.wikipedia.org/wiki/XAMPP) al que accedíamos mediante la URL de `localhost`. También era posible que tuvieras un servidor o hosting contratado y directamente desarrollásemos en él por SSH o subiendo los archivos por FTP cada vez que los editabas para comprobar las modificaciones. Por último, podría ser que no utilizases ninguno de estos métodos y que directamente lo hicieras en local sin ningún servidor abriendo con el navegador los archivos HTML en cuyo caso lo que se vería en la ruta URL sería algo como `file:///ruta/a/tu/fichero.html`.

En todos los casos anteriores normalmente se trataba de una complicadez o un engorro por el tema de tenerlo todo descentralizado y no tan organizado como podría pretenderse.

## Y Llego NodeJS

Por si aún no lo sabes, [Node.js](http://es.wikipedia.org/wiki/Node.js) es un entorno de programación basado en [ECMAScript](http://es.wikipedia.org/wiki/ECMAScript) (JavaScript) y orientado a la capa servidor, lo que viene a ser **ejecutar JS en servidor**.

### Un Poco De Historia

Todo empieza en [2009](https://github.com/joyent/node/tree/9d7895c567e8f38abfff35da1b6d6d6a0a06f9aa), cuando se publica para Linux la primera versión de Node. Fue desarrollado por **Ryan Dahl** perteneciendo el código a **[Joyent Inc.](https://www.joyent.com/)**, que es la empresa en la que trabajaba en el momento en el que lo desarrolló.

Ryan sacó la idea al ver una barra de progreso en [Flickr](https://www.flickr.com/) para subir un archivo, la página en realidad no sabía a ciencia cierta en que estado estaba la carga del archivo, tenía que hacer una petición al servidor cada X tiempo para que este le indicará en que estado estaba la carga. Ryan quiso ir más allá.

No fue hasta la [JSConf EU](http://jsconf.com/) de 2009 en Noviembre que NodeJS empezó a ganar popularidad.

### ¿Qué Te Aporta NodeJS?

Lo principal y más recalcable es que te permite ejecutar código JavaScript, código JavaScript que se ejecuta en una máquina, algo que antes no era muy habitual (Lo normal era que se ejecutase en un navegador únicamente). Esto, por ejemplo, permite desarrollar programas de escritorio en JavasCript (El editor de texto [Atom](http://atom.io/) está programado en JS y utiliza NodeJS).

Pero para lo que más se usa Node hoy en día es para **crear Servidores Web** y **albergar la Lógica de las Aplicaciones Web** que se desarrollen en los mismos.

Lo que vas a hacer hoy es lo más sencillo del _mundo Node_, vas a **utilizar NodeJS como servidor web**.

## Instalando NodeJS

Muy sencillo, [descargas NodeJS](https://nodejs.org/download/) y lo instalas asegurándote de que durante la instalación se añada al PATH (No se si en mac esta gerga es la correcta) o tendrás que hacerlo tú manualmente después.

## Tus Primeros Pasos Con NodeJS

No me voy a entretener mucho en explicarte de que va el tema pero sí creo conveniente que sepas un poquito más de NodeJS.

### La Consola

Un vez tienes instalado Node deberías poder abrir una consola en tu sistema y ejecutarlo sin contratiempos (con el comando `node`), ejecuta el comando `node -v` en tu consola para ver la versión de Node que se encuentra instalada en el sistema:

```bash
node -v
v0.12.0
```

Qué guay! Ya eres desarrollador web!

### Operaciones Simples Con NodeJS

Prueba a hacer un par de operaciones muy sencillas para que veas lo que sabe hacer Node. Para esto lo que tienes que hacer es ejecutar `node`, a secas, en la consola y pasarás a la **consola de Node** que ejecuta JavaScript (Lenguaje de programación que [deberías saber](http://www.codecademy.com/es/courses/javascript-beginner-es-4j293/) antes de seguir leyendo). Ejecuta un par de comandos:

```bash
node
> 2 + 3
5
> 'Soy un experto en Node'
'Soy un experto en Node'
> var adjetivo = 'gran'
undefined
> 'Soy un ' + adjetivo + ' experto en Node'
'Soy un gran experto en Node'
> console.log('Hola Pixel!')
Hola Pixel!
undefined
```

Como ves, es JavaScript que se está ejecutando en nuestro equipo gracias a Node.

### NPM

[NPM](https://www.npmjs.com/) es un **Gestor de Paquetes** que viene con NodeJS, antes sus siglas significaban _Node Package Manager_, pero ahora no creo que deba hacerse esa asociación, precisamente si visitas el [paquete NPM](https://www.npmjs.com/package/npm) en el catálogo de paquetes de NPM (valga la redundancia), verás que ellos lo llaman _Gestor de Paquetes para JavaScript_ y en la página principal, si te fijas en la cabecera, verás que el título que ponen (Puede que tengas la suerte de ver _Node Package Manager_) varía utilizando las siglas NPM (Si haces click puedes ver como cambian).

#### ¿Para Qué Sirve NPM?

Muy simple, NPM lo que hace es administrar los paquetes JS que necesitemos, ya sea para usar en una web o para usar como herramientas de desarrollo así como respetar las versiones del paquete que estamos usando.

Podríamos extender mucho más está sección, pero si lees el título sabrás por qué no lo hago (Basiquísimo).

## Montar Un Servidor Web Con NodeJS En Local

Hay muchas maneras de **montar un server en local con Node**, pero hoy sólo te voy a explicar una y, la que a mi parecer, es la más básica.

### Preparando El Entorno De Desarrollo

Vas a empezar con lo más básico, con lo primero de lo primero. Tienes que tener, como ya hemos dicho anteriormente, NodeJS instalado en el equipo y en el PATH para poder ejecutarlo en consola.

Ahora crea un nuevo directorio que no esté en una ruta muy complicada. Yo por ejemplo he creado ‘C:/proyectos/mi-proyecto-web/’.

### Instalando HTTP-Server Con NPM

Si no lo has deducido por el título, te explico, [HTTP-Server](https://www.npmjs.com/package/http-server) se trata de un paquete disponible en el catálogo de NPM. HTTP-Server es un _script_ de JavaScript que al ejecutarlo crea un servidor HTTP en Node.

Para instalarlo puedes usar NPM con una series de comandos que te permitirán disponer de este _script_ en tu equipo. Antes de instalarlo con NPM tienes que saber que NPM **tiene dos formas básicas de instalar paquetes**, de forma local o global. Al instalar un paquete de forma local sólo tendrás acceso a sus scripts desde el directorio en el que lo instalaste, mientras que al instalar un paquete de manera global tendrás acceso a los scripts desde cualquier parte del sistema.

Yo te recomiendo que el paquete de HTTP-Server lo instales de manera global para poder utilizarlo siempre que quieras estés donde estés por consola. Para ello, lo único que tiene que hacer es lo siguiente. Abre una consola y ejecuta el siguiente comando:

```bash
npm install -g http-server
```

Verás que empiezan a salir trazas indicando el estado de la instalación, presta atención de que no recibes ninguna de error, en ese caso es posible que tengás algún problema de permisos, de conexión o una mala configuración (Acude a tu amigo Google).

_**Nota:** Si no deseas tener HTTP-Server instalado de manera global debes posicionarte en el directorio que hayas creado y ejecutar el mismo comando sin el parámetro `-g`._

Ahora que ya tienes el paquete de HTTP-Server en el equipo puedes ejecutar los scripts para crear y levantar el servidor web en local mediante el siguiente comando (acuérdate de posicionarte en la carpeta que creaste antes de ejecutarlo):

```bash
http-server
```

Deberías ver algo parecido a esto:

```bash
Starting up http-server, serving ./ on: http://0.0.0.0:8080
Hit CTRL-C to stop the server
```

Quiere decir que tu server ya está arrancado (Puedes pararlo con `Cntrl+C`) y escuchando en el puerto `8080`, si entonces abres un navegador y visitas _http://localhost:8080_ verás el **Index of** de tu server, esto es por que aún no tienes ningún archivo en tu directorio, puedes hacer la prueba creando un **index.html** en tu carpeta con lo siguiente:

```html
<!DOCTYPE html>
<html lang="es-ES">
  <head>
    <title>NodeJS Rules!</title>
  </head>
  <body>
    <p>Hola NodeJS!</p>
  </body>
</html>
```

Si vuelves a acceder a la misma URL verás la magia de Node.

Ya puedes empezar a desarrollar webs tirando Apache a la basura! No te canses de aprender.
