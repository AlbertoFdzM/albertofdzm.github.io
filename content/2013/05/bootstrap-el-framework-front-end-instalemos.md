---
title: "Bootstrap: El Framework Front-End. Instalemos!"
date: 2013-05-15
lastmod: 2024-08-11
tags:
  - BootStrap
---

**Atención!!!** Este articulo es referente a versiones anteriores a Bootstrap v3.0.0, por lo que muchas de las clases y código mostrado en este artículo se encontrarán **obsoletos** si se utilizan las versiones v3.0.0 o posteriores. [Bootstrap](http://twitter.github.io/bootstrap/ "Bootstrap"), se trata de pocos archivos, sí, pero darán un empujón visual a tu página o aplicación web bestial. Así que a continuación te explicaré la sencilla forma de instalarla.

---

## Sus entrañas

Si accedes al link que he puesto anteriormente y te descargas el archivo zip que contiene Bootstrap verás que no se trata de muchos archivos, al contrario, se trata de muy pocos y seguramente no uses ni la mitad. Así que te explicaré lo que hace cada archivo, pero antes de empezar te diré que lo archivos con la extensión **.min** son iguales que sus hermanos que no la llevan, sólo que estos tienen su código embutido, de esta manera el archivo ocupa menos y tarda menos en cargarse. Empecemos:

### bootstrap.css / bootstrap.min.css

Este archivo es básicamente el corazón del Framework, digamos que sin este archivo tu Bootstrap ya no sería Bootstrap. Si entiendes algo de web, algo que espero que sepas, por que si no no entiendo que haces leyendo esta entrada... bueno, si sabes algo de web, como apreciarás se trata de una hoja de estilos, ¿Un simple archivo CSS? No, no, no, no, este pequeño y potente amiguito te va ahorrar horas y horas de diseño web y de ensayo y error. En el se encuentran todos los estilos básicos necesarios para la construcción de una página o aplicación web medianamente decente y bonita, si buscas por la página de Bootstrap verás varios ejemplos para que te vayas haciendo a la idea.

### bootstrap-responsive.css / bootstrap-responsive.min.css

De nuevo, si sabes algo de web, esta vez un poco más que antes, verás que este archivo lleva implícita la palabra "responsive" ¿Qué qué significa? No tengo ni idea... Jajaja es broma, la diferencia entre el archivo anterior y este es que este último se adapta al tamaño de pantalla del dispositivo que este visualizando tu creación, intentaré decirlo de otro modo, si lo vieses desde una pantallita pequeñita lo verías distinto que si lo vieras desde un monitor, y en ambos casos podrías leerlo bien, ¿Un ejemplo? Claro, vuelve a la Página de Bootstrap y haz la ventana más pequeña (en el caso de que puedas, si estás leyendo esto en un smartphone, difícil lo llevas) verás como cambia las disposición de los elementos de la página. Está adaptación dinámica de los elementos se produce gracias a este archivo. Ojo, se trata de un complemento para el anterior, si utilizamos el responsivo deberemos linkar también el normal.

### bootstrap.js / bootstrap.min.js

Me queda este último, el archivo JS de Bootstrap, en este archivo de implementan las funcionalidades interactivas para la interfaz gráfica y algunos componentes chulos para nuestro diseño. Por ejemplo, nos permite crear pestañas, menús desplegables, sliders... entro otras cosas. Por lo que se trata de un archivo necesario para darle funcionalidad completa a nuestro diseño en Bootstrap.

## Instalación

Bien, como no me quiero enrollar mucho, sólo te voy a explicar cómo instalarlo e intentaré exponerte un par de ejemplos otro día, si no quieres esperar a que yo publique nada, puedes ver como se utiliza en la web de Bootstrap, en la que tienes bastantes ejemplos y código de muestra con el que empezar. Empecemos!:

Bueno como ya tenemos los archivos lo único que necesitamos ahora es añadirlos a nuestro proyecto y linkarlos a el. Yo tiendo a guardas cada utilizad que vaya a usar en mis proyectos en la carpeta **/res** (resources), por lo que mis archivos estarían ubicados de la siguiente manera:

- /res
  - /bootstrap
    - bootstrap.min.css
    - bootstrap-responsive.min.css
    - bootstrap.min.js

Como puedes ver sólo he añadido los .min ya que son los archivos que más rápido se cargan y los que te recomiendo usar, a menos que pienses realizar cambios sobre ellos. Bien, poniéndonos en el caso de que estamos empezando un nuevo proyecto web vamos a crear los siguientes archivos en nuestro raíz (directorio base):

- /res
  - /bootstrap
    - bootstrap.min.css
    - bootstrap-responsive.min.css
    - bootstrap.min.js
- index.html
- style.css

Y no hay más na! Poco tengo que explicar, en **index.html** iría nuestro código HTML (la información) y en el archivo **style.css** irían los estilos que queramos añadir a parte de los de Bootstrap o las modificaciones que queramos hacer sobre los estilos de Bootstrap. Bien, ahora si más demora te muestro cómo deberíamos linkar todos los recursos en nuestro index:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Instalando Bootstrap</title>
    <link href="res/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="style.css" rel="stylesheet" />
  </head>
  <body>
    <h1>Ola Ke ase?</h1>
    <p>Instalas Bootstrap o ke ase?</p>

    <script src="res/bootstrap/bootstrap.min.js"></script>
  </body>
</html>
```
