---
title: Utilizando la API de IFrame de YouTube
date: 2015-07-07
lastmod: 2016-01-11
tags:
  - YouTube API
---

<!--kg-card-begin: markdown-->

**YouTube** provee una **API de IFrame** capaz de manejar los [`iframe`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) que se encargarán de desplegar los videos de YouTube que incrustes en tu web.

Para aclarar todo antes de empezar, esta manera de trabajar con YouTube cambia de la tradicional de copia-pega, ya que aquí generamos un reproductor dinamicamente dentro de nuestra página lo que nos permite mucho más control y personalización sobre YouTube.

## Requisitos

Los requisitos mínimos para poder trastear con los videos de YouTube en tu web son los siguientes.

- Que tengas conocimiento sobre JavaScript.
- Que los usuarios que vayan a hacer uso de la web tengan un navegador compatible con la función `postMessage` de HTML5. La mayoría de navegadores de hoy en día cumplen este requisito a excepción de IE7.
- El mínimo que pide YouTube para incrustar videos en tu web es que sus dimensiones no sean inferiores a 200px por 200px y recomiendan unos tamaños mínimos para los videos panorámicos 16:9 de 480px por 270px.

## Ejemplo Básico

Primero lo básico, vamos a cargar la API de IFrame y a cargar un video para posteriormente pararlo a los 5 segundos.

Aquí tienes el código inicial:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>
      Aprendiendo a usar la API de IFrame de Youtube con Only The Pixel
    </title>
  </head>
  <body>
    <div id="player"></div>

    <script src="https://www.youtube.com/iframe_api"></script>
    <script>
      // Aquí tendremos que ir aplicando los cambios
      function onYouTubeIframeAPIReady() {
        alert("La API de IFrame de YouTube está lista!");
      }
    </script>
  </body>
</html>
```

Te explico, cuando la API de IFrame está cargada y lista para dar caña ejecuta el método `window.onYouTubeIframeAPIReady()`, que es el que básicamente nos permite tener un punto de enganche con la API, en este caso simplemente lo he usado para demostrar que la función se ejecuta automáticamente una vez el código de la API de IFrame de YouTube ha cargado.

Vamos a cosas más serias:

```javascript
// Definimos la variable en la que almacenaremos nuestro objeto YT.Player
var player,
  // Y otras más para la carga asíncrona de la API
  firstScriptTag;
tag = document.createElement("script");

// Con estás 3 lineas se consigue que la API de YouTube pueda cargarse asínconamente
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Una vez la API de Iframe está lista...
function onYouTubeIframeAPIReady() {
  // Definimos las opciones
  var options = {
    // Anchura (Opcional - por defecto 640)
    width: 480,
    // Altura (Opcional - por defecto 360)
    height: 270,
    // El identificador del video (Obligatorio)
    videoId: "YE7VzlLtp-4",
    // Las opciones para el reproductor (Opcional)
    playerVars: {},
    // Registro de eventos del reproductor
    events: {},
  };

  // Definimos nuestro objeto de video
  player = new YT.Player(
    // El primer parametro será o bien una referencia a un elemento del DOM
    // o bien un ID de uno de los elementos, le cual será reemplazado por le iframe.
    "player",
    // El segundo parámetro se trata de un objeto con todas las opciones
    options
  );
}
```

Con esto habrás construido un reproductor de YouTube listo para mostrar videos.

## Opciones Extra Para El reproductor

Ahora que ya tenemos el ejemplo básico prueba a añadirle algunas cosas más, la API de IFrame de YouTube permite añadir **opciones extra para el reproductor** que hacen que este sea mucho más personalizable o incluso una lista de reproducción. Estas opciónes se definen en el parámetro `playerVars`, aquí puedes ver una ejemplo con todas los opciones:

```javascript
playerVars: {
  // Si lo controles se pueden autoocultar o no
  autohide: 1,
  // Si el video debe iniciarse automaticamente
  autoplay: 0,
  // Si se quiere forzar la muestra de subtitulos
  cc_load_policy: 0,
  // El color de la barra de progreso (red/white)
  color: white,
  // De que manera mostrar los controles (0/1/2)
  controls: 2,
  // Activa/Desactiva los controles por teclado
  disablekb: 0,
  // Active/Desactiva la API JS (se encuentra deprecada)
  enablejsapi: 0,
  // El tiempo en segundos que tardará en deteners el repdroductor
  end: 0,
  // Muestra/Oculta el boton de pantalla completa
  fs: 1,
  // Configura el didioma para el reproductor
  hl: 'es',
  // Configura las anotaciones del video (1 permite que se muestren / 3 impide que se muestren)
  iv_load_policy: 3,
  // Guarda relación con el parámetro listType, si listType es 'search' este parámetro contendrá
  // la consulta de la búsqueda, si listType es 'user_uploads' este parámetro deberá contener el
  // identificador del canal y si es 'playlist' este tendrá que contener el ID de la lista/video
  list: undefined,
  // Sirve para indicar el tipo de lista (search/user_uploads/playlist) y guarda relación con el parametro list
  listType: undefined,
  // Con este indicamos si queremos reproducir en bucle el video/lista de reproducción
  loop: 0,
  // Este paráetro nos permite mostrar/ocultar el logotipo de youtube en el reproductor
  modestbranding: 0,
  // En el caso de que hayamos indicado la propiedad enablejsapi a 1 aquí tendremos
  // que indicar el dominio
  origin: 'http://onlythepixel.com',
  // Se trata de otro modo de crar listas de reproducción, aquí podemos indicar una lista
  // de IDs de video separados por comas
  playlist: undefined,
  // Se trata de un parámetro exclusivo para iOS e indica si el video se reproducirá inline (1)
  // o a pantalla completa (0)
  playsinline: 0,
  // Este parámetro nos sirve para indicar si querémos que el reproductor muestre
  // videos relacionados
  rel: 0,
  // Este parámetro se usa para mostrar u ocultar info sobre la lista o el usuarios
  showinfo: 1,
  // En segundos, se indica en que punto del video se debe iniciar la reproducción
  start: 0,
  // Con este indicamos el tipo de tema para el reproducción (dark/light)
  theme: 'light'
}
```

Puedes ver más información sobre estos parámetros en la [web de desarrolladores de Google para la API de IFrame de YouTube](https://developers.google.com/youtube/player_parameters).

## Eventos Del Reproductor

El parámetro que me falta por explicar es `events` que es el que registra los diferentes listeners asociados a los eventos del reproductor. Aquí tienes un ejemplo con todos los eventos disponibles:

```javascript
events: {
  // Se dispara cuando el reproductor ha cargado la API y estña llisto para reproducir
  onReady: onPlayerReady,
  // Se lanza cada vez que el reproductor cambia de estado y recibe comoparámetro un número:
  //    -1: sin empezar
  //    0: finalizado
  //    1: en reproducción
  //    2: en pause
  //    3: almacenado en búfer
  //    5: video en cola
  //
  // Para identificar alguno de estos estados podemos compararlos contra los siguientes valores:
  //    YT.PlayerState.ENDED
  //    YT.PlayerState.PLAYING
  //    YT.PlayerState.PAUSE
  //    YT.PlayerState.BUFFERING
  //    YT.PlayerState.CUED
  onStateChange: onPlayerStateChange,
  // Se activa cada vez que la calidad del video cambia y remite lo siguientes valores:
  //    small
  //    medium
  //    latge
  //    hd720
  //    hd1080
  //    highres
  onPlaybackQualityChange: onPlayerPlaybackQualityChange,
  // Se dispara cada vez que el ratio de reproducción cambia
  onPlaybackRateChange: onPlayerPlaybackRateChange,
  // No hay mucho que explicar, cuanod hay un error:
  //    2: La solicitud tiene algún parámetro erroneo
  //    5: Errores relacionados con el reproductor HTML5
  //    100: Video no encontrado
  //    101: No se permite la reproducción de ese video en reproductores embedidos
  //    150: Es lo mismo que el error 101
  onError: onPlayerError,
  // Se produce cada vez que la API provee metodos nuevos a los que atacar. Por ahora
  // sólo sirve para detectar la carga dle módulo de subtitulos 'cc' y explorar sus opciones
  onApiChange: onPlayerApiChange
}
```

## Trabajando Con Los Eventos

Voy a exponer un par de ejemplos para entender mejor como funciona la API y como sacarle partido. Algo básico, por ejemplo, voy a mostrar los eventos en un listado.

Primero tienes que añadir un contenerdor al HTML para que contenga estas entradas, voy a ponerlo después del reproductor:

```html
<div id="player"></div>
<pre id="log"></pre>
```

Y ahora con el JavaScript para introducir las trazas en el bloque:

```javascript
var player,
  firstScriptTag,
  tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  var options = {
    width: 480,
    height: 270,
    videoId: "YE7VzlLtp-4",
    playerVars: {
      modestbranding: 1,
      theme: "light",
    },
    events: {
      onReady: registerEvent,
      onStateChange: registerEvent,
      onPlaybackQualityChange: registerEvent,
      onPlaybackRateChange: registerEvent,
      onError: registerEvent,
      onApiChange: registerEvent,
    },
  };

  player = new YT.player("player", options);
}

function registerEvent(ev, data) {
  var eventData = JSON.parse(event.data);

  // No le des mucha importancia a esta función ya que su única finalidad es la de devolver
  // la hora para las trazas
  function getTimestamp() {
    var hours,
      minutes,
      seconds,
      milliseconds,
      timestamp = new Date(Date.now());

    hours =
      timestamp.getHours() > 9
        ? timestamp.getHours()
        : "0" + timestamp.getHours();
    minutes =
      timestamp.getMinutes() > 9
        ? timestamp.getMinutes()
        : "0" + timestamp.getMinutes();
    seconds =
      timestamp.getSeconds() > 9
        ? timestamp.getSeconds()
        : "0" + timestamp.getSeconds();
    milliseconds =
      timestamp.getMilliseconds().toString().length > 1
        ? timestamp.getMilliseconds().toString().length > 2
          ? timestamp.getMilliseconds()
          : "0" + timestamp.getMilliseconds()
        : "00" + timestamp.getMilliseconds();

    return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
  }

  document.querySelector(".log").innerHTML +=
    getTimestamp() + " - " + eventData.event + "\n";
}
```

Con esto podrás ver los eventos que está lanzando el reproductor, lo normal es que veas algo así:

```bash
16:44:38:634 - onReady
16:44:41:738 - onStateChange
16:44:41:739 - onStateChange
16:44:42:089 - onPlaybackQualityChange
16:44:42:212 - onStateChange
```

Prueba modificando valores con los controles dle reproductor para ver que eventos quedan registrados y así hacerte una idea de los evento sque se lanzan con cada interacción (Por ejemplo, al activar/desactivar las anotaciones se dispara el evento `onApiChange`).

Gracias a estos eventos es posible detectar el estado del reproductor y actuar en base a ello.

## Las Funciones

Además de los eventos la **API de IFrame de YouTube** también provee una seríe de metodos que te van a permitir “jugar” con el reproductor (botones personalizados, reproducciones simultaneas, carga de listas de reproducción, etc.).

Aquí tienes una lista con los métodos a los que puedes acceder por medio del objeto `YT.player`:

`cueVideoById`, `loadVideoById`, `cueVideoByUrl`, `loadVideoByUrl`, `cuePlaylist`, `loadPlaylist`, `playVideo`, `pauseVideo`, `stopVideo`, `seekTo`, `clearVideo`, `nextVideo`, `previousVideo`, `playVideoAt`, `mute`, `unMute`, `setVolume`, `getVolume`, `setSize`, `getPlaybackRate`, `setPlaybackRate`, `getAvailablePlaybackRates`, `setLoop`, `setShuffle`, `getVideoLoadedFraction`, `getPlayerState`, `getCurrentTime`, `getVideoStartBytes`, `getVideoBytesLoaded`, `getVideoBytesTotal`, `getPlaybackQuality`, `setPlaybackQuality`, `getAvailableQualityLevels`, `getDuration`, `getVideoUrl`, `getVideoEmbedCode`, `getPlaylist`, `getPlaylistIndex`, `addEventListener`, `removeEventListener`, `getIframe`, `destroy`

Puedes informarte mejor de todos estos métodos en la [web para desarrolladores de Google sobre la API de IFrame de YouTube](https://developers.google.com/youtube/iframe_api_reference?hl=es#Functions)

<!--kg-card-end: markdown-->
