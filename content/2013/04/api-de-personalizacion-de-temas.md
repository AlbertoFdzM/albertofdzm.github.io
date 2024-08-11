---
title: API de Personalización de Temas en WordPress
date: 2013-04-19
lastmod: 2024-08-11
tags:
  - PHP
  - Temas WordPress
  - WordPress
---

En este articulo articulado te voy a enseñar la magia de utilizar la API para la personalización de temas en WordPress, ¿Qué qué es? serás tarugo... Bueno, se trata de un conjunto de código que nos permite meter mano a la pantalla de personalización de temas, te enseño una imagen para sacarte de dudas:

![Customization Panel](/old-posts-images/2013/04/Customization-Panel.jpg)

A esta pantalla puedes acceder desde la sección de **Administración>Apariencia>Temas** y una vez aquí pulsando en **Personalizar** sobre el tema que tengas activo.

Una vez resuelta esta duda existencial de la que depende el universo y cada partícula que hay en él, pasemos al primero de los primeros pasos.

## Antes de nada y frente a todo

Lo primero que vas a necesitar es tener tu sesera llena de conocimientos (espero que sepas lo que son), conocimientos sobre WordPress, y más en concreto los siguientes:

- [Desarrollo de Temas](https://codex.wordpress.org/Theme_Development "Desarrollo de Temas (WordPress Codex)")
- [Desarrollo de Plugins](https://codex.wordpress.org/Writing_a_Plugin "Desarrollo de Plugins (Codex WordPress)")
- [API para configuraciones](https://codex.wordpress.org/Settings_API "API para Configuraciones (Codex WordPress)")

Sin los conocimientos anteriores seguramente andes perdido y no sepas muy bien de que vamos a hablar, así que, te pido el favor de hacerte el favor de empezar primero con esas áreas antes de empantanarte aquí.

## Empecemos empezando lo empezado

Bien, lo primero que debes saber es que vamos a usar dos ganchos principalmente:

- **`wp_head`**
- **`customize_register`**

Y, opcionalmente, si queremos "ciclar" nuestras implementaciones con JavaScript:

- **`customize_preview_init`**

## La función de registro

### Dar de alta nuevas opciones de personalización

Para dar de alta las nuevas opciones de nuestro panel de personalización en WordPress vamos a usar el gancho **customize_register** al que anclaremos las funciones que desempeñaran esta tarea. Ejemplito a continuación:

```php
//Definimos la función que registrara nuestras opciones
function test_customize_register( $wp_customize )
{
    // Damos de alta nuestras opciones
    $wp_customize->add_setting( 'test_font_color' , array(
        'default'     => '#0000FF',
        'transport'   => 'refresh',
    ));
}
// Añadimos la función que hemos definido al código de WP
add_action( 'customize_register', 'test_customize_register' );
```

Si te das cuen’ sólo estamos definiendo una opción, su valor por defecto y que sucederá si su valor se cambia, ojito al dato, que no estamos especificando el tipo de opción aún, esto lo haremos después.

Con el parámetro `'transport' => 'refresh'` indicamos que queremos que la página se recargue cuando el valor de la opción cambie, por lo que la página se refrescará si cambiamos el color de nuestra opción en este caso. El otro valor permitido para este parámetro es `'postMessage'` esto no recargará la página, sino que permitirá a nuestro código JavaScript acceder al nuevo valor que hayamos asignado para efectuar los cambios en vivo.

### Dar de alta la sección

Bueno, ya tenemos la función para el registro anclada y las nuevas opciones se darán de alta. Ahora vamos a crear una nueva sección donde agrupar nuestras opciones que añadiremos a la función que hemos definido:

```php
$wp_customize->add_section( 'test_customize_section' , array(
    'title'      => __('Opciones Extra','my_test'),
    'priority'   => 30,
));
```

Esto último es opcional, porque, como ya deberíais saber (si no, consúltalo en la API para configuraciones), las nuevas opciones se pueden incluir en las secciones ya existentes. Así pues, puedes elegir la que creas que casa mejor con las opciones que definas.

### Añadir la opción

¿Qué falta? Pues introducir la opción que hemos dado de alta en una sección para que sea desplegada. ¿¡¿PERO NECESITAS OTRO EJEMPLO?!? Toma código pesao:

```php
$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'test_color', array(
	'label'      => __( 'Color de Testeo', 'mytheme' ),
	'section'    => 'test_customize_section',
	'settings'   => 'test_font_color'
)));
```

Esto último también debe ir en nuestra función anclada.

Para los dudosos dubitativos que dudan sobre la estructura de este puzzle WP voy a concederos el favor de daros el ejemplo completo de la función de registro, lo sé, no hace falta que me lo agradezcáis:

```php
function test_customize_register( $wp_customize )
{
    $wp_customize->add_setting( 'test_font_color' , array(
        'default'     => '#0000FF',
        'transport'   => 'refresh',
    ));

	$wp_customize->add_section( 'test_customize_section' , array(
		'title'      => __('Opciones Extra','my_test'),
		'priority'   => 30,
	));

	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'test_color', array(
		'label'      => __( 'Color de Testeo', 'mytheme' ),
		'section'    => 'test_customize_section',
		'settings'   => 'test_font_color'
	)));
}
add_action( 'customize_register', 'test_customize_register' );
```

Ahora ya podríamos visualizar nuestra opción en el personalizador de temas, pero nos falta una cosa bastante importante, modificar los estilos para que los cambios se apliquen.

## Utilizar los cambios aplicados

Para que los cambios que realicemos sobre nuestra nueva opción del customizador de temas se puedan aplicar debemos desarrollar un código que los aplique, se trata de un lógica aplastante, lo sé, a veces me asombro con mi inteligencia.

Ejemplo al canto:

```php
<?php // Definimos la función que ejecutará los cambios en base a nuestra opción
function test_customize_css() {
    // Revisamos si tenemos la opción establecida
    if ( get_theme_mod( 'test_font_color' ) ) {
        // Aplicamos los cambios
        ??><style type="text/css">
                body {
                    color: <?php echo get_theme_mod('test_font_color'); ?>
                }
            </style><?php }
}
//Anclamos nuestra función al código de WordPress
add_action( 'wp_head', 'test_customize_css');
?>
```

Ahora el color del texto en nuestra web debería cambiar dependiendo del color que elijamos en el panel de personalización.

¿Te ha gustado? ¿No te funciona? ¿Tienes dudas? ¿Sufres estreñimiento ocasional?!?!?! No dudes en comentarlo.
