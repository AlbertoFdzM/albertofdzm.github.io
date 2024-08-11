---
title: Hacer un Plugin en WordPress
date: 2013-12-18
lastmod: 2024-08-11
tags:
  - WordPress
---

Me he topado con el problema de tener que **añadir una funcionalidad a WordPress sin poder editar el tema** que este tenia, y en estos casos viene muy bien implementar esa funcionalidad mediante el **desarrollo de un Plugin en WordPress**. Antes de esto, mencionar que aunque un Plugin añada funcionalidades a nuestro WordPress también va a provocar que los tiempos de carga aumenten ya que estamos elevando la cantidad de archivos que nuestro WordPress debe cargar, así como las configuraciones, por lo que conviene aunar todas las funcionalidades que desarrollemos en un solo Plugin si no tenemos pensado usarlas de manera individualizada.

Así pues podemos empezar con lo más básico para el desarrollo de Plugins en WordPress

## Estructura básica de un Plugin WordPress

Lo más básico para WordPress sería añadir un **archivo PHP** a la ruta `wp-content/plugins/` que se llamará en base al nombre del Plugin (Por ejemplo: _mi-plugin.php_) y que deberá contener lo siguiente (como mínimo):

```php
<?php /**
 * Plugin Name: Mi Plugin
 * Plugin URI: http://miplugin.com
 * Description: Mi primer Plugin de WordPress
 * Version: 1.0
 * Author: AlbertoFdzM
 * Author URI: http://onlythepixel.com
 * License: GPL3
 */
?>
```

Sí, es simplemente código comentado con la siguiente info:

- **Plugin Name:** Nombre con el que se mostrará nuestro Plugin en WordPress (Este es el único dato obligatorio)
- **Plugin URI:** Enlace a la web del Plugin
- **Description:** Una breve descripción definiendo nuestro Plugin para WordPress
- **Version:** La versión e la que se encuentra nuestro Plugin
- **Author:** Nombre del autor o autores del Plugin
- **Author URI:** Enlace a la web del autor o autores del Plugin
- **License:** Licencia bajo la que se rige el código del Plugin de WordPress que hemos desarrollado

Si este archivo PHP lo dejamos en la ruta de nuestro WordPress `wp-content/plugins/` y acudimos a la **pantalla de administración de Plugins** en WordPress, veremos lo siguiente en el listado de Plugins de nuestro WordPress:\
![Mi Plugin WordPress](/old-posts-images/2013/12/Mi_Plugin_WordPress.png)

Ahora bien, lo recomendable (muy recomendable) es que, en vez de situar directamente el archivo PHP de nuestro Plugin WordPress en el raíz de la carpeta _plugins_, lo coloquemos en una carpeta del mismo nombre que nuestro archivo PHP (_mi-plugin_ en este caso) para evitar que entre en conflicto con otros Plugins de WordPress y que además podamos agrupar todos los archivos que vaya a contener nuestro Plugin en una sola ubicación (Archivos JavaScript, CSS, HTML, PHP, imágenes, etc.).

De aquí en adelante sólo te queda trastear con las diferentes funciones que tiene WordPress para empezar a desarrollar funcionalidades en tu nuevo Plugin.
