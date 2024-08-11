---
title: Cómo Incluir Más Hojas de Estilo CSS a Tu Tema en WordPress
date: 2013-09-09
lastmod: 2024-08-11
tags:
  - Temas WordPress
  - WordPress
---

Pues no hay mucho que decir que el titulo de este artículo no te haya dicho ya. Voy a explicarte cómo podemos añadir nuestras hojas de estilo a nuestro tema en WordPress y te mostrare un par de ejemplos para que lo entiendas.

## Posición

Esto es importante, la posición, si alguna vez has desarrollado algún tema de WordPress, has jugueteado con algún tema ya creado o te has echo un tema hijo con el que poder ir implementando código son que este sea pisado por las actualizaciones sabrás, o deberías saber que el núcleo de la funcionalidad de los temas se engloba en un sólo archivo generalmente (todo esto depende, claro está, de la forma de desarrollar temas de cada uno), el archivo **functions.php**, en este archivo es donde se despliegan sobre el núcleo y las diferentes ramas de WordPress todas las funcionalidades que queramos implementar sobre nuestro tema, o por lo menos deben partir de él.

Bien, dicho lo anterior sobra decir que en este mismo archivo es donde deberás ubicar el código necesario para la llamada a las diferentes hojas de estilos que queramos emplear en nuestro tema. Empecemos!

## Las funciones

Básicamente deberás emplear 3 funciones concretas que son las que aran todo el trabajo, o casi todo. Son las siguientes:

- [add_action()](http://codex.wordpress.org/Function_Reference/add_action "add_action()")
- [wp_register_style()](http://codex.wordpress.org/Function_Reference/wp_register_style "wp_register_style()")
- [wp_enqueue_style()](http://codex.wordpress.org/Function_Reference/wp_enqueue_style "wp_enqueue_style()")

Es sencillo, cada una tiene un propósito diferente. De este modo empezarás definiendo nuestra propia función dentro de nuestro archivo **functions.php** de la siguiente manera:

```php
// Creamos nuestra función
function test_mis_estilos() {
}
```

### `add_action()`

Nos servirá para anclar el código que desarrollemos al código de WordPress y de este modo, integrarlo en nuestra página web. Si accedes a [la página del códice](http://codex.wordpress.org/Function_Reference/add_action "add_action()"), podrás ver su definición y diferentes argumentos de los que consta. Por lo tanto, añadiendo esta función a nuestro algoritmo, nuestro código quedara tal que así:

```php
function test_mis_estilos() {
}
// Añadimos la función al código de WordPress
add_action('wp_enqueue_scripts', 'test_mis_estilos');
```

### `wp_register_style()`

Con este función podrás dar de alta o, mejor dicho, registrar una hoja de estilo en le código de WordPress para poder ser encolado o reclamado para ser utilizado. Como hemos hecho anteriormente, vamos a añadir este nuevo ingrediente a nuestra receta:

```php
function test_mis_estilos() {
    // Registramos nuestra hoja de estilos en WordPress
    wp_register_style(
        'mi-estilo',
        get_template_directory_uri() . '/css/estilo.css'
    );
}
add_action('wp_enqueue_scripts', 'test_mis_estilos');
```

### `wp_enqueue_style()`

Esta última función lo que hará será requerir que el estilo u hoja de estilo que se especifique en ella se añada en nuestra web para que de esta manera se apliquen los estilos CSS que contenga. Nuestro código quedará así:

```php
function test_mis_estilos() {
    wp_register_style(
        'mi-estilo',
        get_template_directory_uri() . '/css/estilo.css'
    );
    // Indicamos a WordPress que añada la hoja de estilos que hemos registrado a la página
    wp_enqueue_style('mi-estilo');
}
add_action('wp_enqueue_scripts', 'test_mis_estilos');
```

No es muy complicado verdad. Esto es una forma fácil de añadir estilos a nuestro tema o de trabajar con ellos en plugins. Te aconsejo que experimentes con estás funciones para variar en que posición se muestra cada hoja de estilos y bueno, si tienes cualquier duda, comenta, es gratis!
