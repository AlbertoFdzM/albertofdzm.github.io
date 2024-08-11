---
title: WordPress - Añadir Campos Extra a los Post
date: 2013-11-21
lastmod: 2024-08-11
tags:
  - PHP
  - Temas WordPress
  - WordPress
---

<!--kg-card-begin: markdown-->

Siempre es útil añadir información adicional a un post o a una página en WordPress para añadir funcionalidades nuevas a nuestras entradas o contenido, cómo por ejemplo, añadir el enlace / URL de la fuente de un articulo del que hemos obtenido dicha información. Esto lo conseguimos gracias a la función [`add_meta_box`](http://codex.wordpress.org/Function_Reference/add_meta_box "WordPress Codex - add_meta_box()").

## `add_meta_box()`

Está función los que hace es indicarle a WordPress que debe añadir una caja de formulario extra a nuestra pantalla de edición de páginas o post. A parte de esto, tendremos que usar otras tantas funciones más para la validación y almacenamiento de los datos que vayamos a gestionar.

## functions.php

Como no, la situaremos en nuestro famoso fichero *functions.php* del tema o bien del plugin que estemos desarrollando, que es donde se alojan siempre las funcionalidades.

## Ejemplo de un Campo Personalizado para Entradas

Vamos a elaborar un campo que se muestre en nuestras pantallas de edicón de entradas para que podamos indicar el enlace a la fuente original de nuestro contenido si es que la tiene y que este se muestre al pié de nuestras entradas si lo hemos rellenado.

Empecemos con las primeras sentencias:

```php
// Declaramos nuestra función
function mi_meta_box() {
    // El primer parámetro sirve para indicar el ID de nuestra sección que se desplegara en el HTML
    $id = 'mi-meta-box';

    // Con el segundo indicamosel título que mostrara nuestra caja
    $title = __( 'Link de la fuente', 'mi_dominio' );

    // Con el tercer parámetro indicamos a que función llamaremos para imprimir el contenido de la sección (La definiremos mas adelante)
    $callback = 'mostrar_meta_box';

    // Con el cuarto parámetro podremos indicar en que tipo de objetos de WordPress se mostrará la sección extra
    $screens = array( 'post', 'page' );

    /* A parte de los argumentos nombrados anteriormente, que son obligatorios (deben indicarse en la función),
    podremos especificar los que se indican a continuación, pero estos ya pasan a ser opcionales
    y no haría falta que fueran definidos */

    // Indicando el contexto indicamos cómo se mostrará nuestra caja de valores ('normal', 'advanced' [Por Defecto] o 'side')
    $context = 'normal';

    // Con el siguiente valor, prioridad, indicamos en que posición se mostrará ('high', 'core', 'default' [Por Defecto] o 'low')
    $priority = 'default';

    /* Ya que hemos definido más de un tipo de post (posts y páginas) tendremos que llamar a la función más de una vez,
    de ahí que usemos el bucle 'foreach' */
    foreach ( $screens as $screen ) {
        // Indicamos a WordPress que debe dar de alta una nueva sección
        add_meta_box(
            $id,
            $title,
            $callback,
            $screen,
            $context,
            $priority
        );
    }
}
/* Ahora sólo falta llamar a nuestra función en el código de WordPress,
para ello usaremos la palabra clave 'add_meta_boxes' */
add_action( 'add_meta_boxes', 'mi_meta_box' );
```

Ya tendríamos la primera parte de nuestra función, pero aún nos falta unas cuantas más. Vamos ahora a imprimir el contenido de nuestra nueva sección de meta-datos.

```php
// Empezaremos declarando la función que nombramos como 'callback' al dar de alta la sección en WP
// También indicaremos los parámetro que le vamos a pasar, que son el post y los argumentos extra que declaramos antes
function mostrar_meta_box( $post ) {
    // Lo primero que debemos hacer es dar de alta un nonce, que se trata de un campo para agregar seguridad a nuestros datos
    wp_nonce_field( 'mostrar_meta_box', 'mi_meta_nonce' );

    // Ahora vamos a recoger el valor de nuestro campo por si ya tuviera información definida en él
    $valor_meta = get_post_meta( $post->ID, 'url_fuente', true );

    // Vamos ahroa a imprimir el formulario
    echo '<label for="meta-url-fuente">';
        _e( "Enlace a la fuente: ", 'mi_dominio' );
    echo '</label>';
    echo '<input id="meta-url-fuente" name="meta-url-fuente" placeholder="http://example.com" type="url" value="' . esc_attr( esc_url( $valor_meta ) ) . '"></input>';
}
```

Bien, con este código nuestro nuevo meta-dato debería aparecer ya en los formularios de nuestro WordPress, algo así:\
![Ejemplo MetaBox WP](/old-posts-images/2013/10/ejemplo_metabox_wp.png)

Nos queda que los datos que introduzcamos en ese campo queden registrados en la base de datos para poder así mostrarlos en nuestra web al visualizar la entrada correspondiente. Vamos a ello:

```php
// Creamos una nueva función encargada de guardar los datos en la base de datos de WordPress
function guardar_meta_box( $post_id ) {
    /* Antes de nada, debemos verificar que todo es correcto si alguna valización se incumple
    se devolveran los datos del post sin actualizar nuestro nueva meta-dato */
    // Empezamos con el 'nonce'
    if ( ! isset( $_POST['mi_meta_nonce'] ) ) {
        return $post_id;
    }

    $nonce = $_POST['mi_meta_nonce'];

    // Verificamos nuestro 'nonce'
    if ( ! wp_verify_nonce( $nonce, 'mostrar_meta_box' ) ) {
        return $post_id;
    }

    // Verificamos también que no se trate de un guardado automático de WP
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return $post_id;
    }

    // Los permisos del usuario que está editando el post
    if ( 'page' == $_POST['post_type'] ) {
        // Comprobamos si puede editar páginas
        if ( ! current_user_can( 'edit_page', $post_id ) ) {
            return $post_id;
        }
    } else {
        // Comprobamos si puede editar entradas
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return $post_id;
        }
    }

    /* Si la ejecución llega hasta aquí querrá decir que cumple con las validaciones */

    // Vamos a sanear los datos
    $mi_metadato = esc_url( $_POST['meta-url-fuente'] );

    // Actualizamos la información
    update_post_meta( $post_id, 'url_fuente', $mi_metadato );
}
add_action( 'save_post', 'guardar_meta_box' );
```

Ya hemos almacenadolainformación en nuestra base de datos WordPress, podemos verificar esto, si introducimos un dato, guardamos la entrada y volvemos a la pantalla de edición de esa entrada, esta vez el campo debería aparecernos relleno con la información que introdujimos al editarla.

Ahora sólo falta que este nuevo dato tenga uso en nuestro WordPress, vamos a desplegarlo, como dijimos al principio de este artículo, al pie da las entradas que lo tengan informado.

Vamos a implementarlo añadiendo el código a nuestro archivo _functions.php_:

```php
// Declaramos la función que se encargará de imprimir el enlace al pie de los posts
function imprimir_fuente_entrada( $content ) {
    // Filtramos para que únicamente se imprima en las entradas
    if ( ! is_feed() && ! is_home() && is_single() ) {
        // Recogemos nuestro meta-dato
        $url_fuente = get_post_meta( get_the_ID(), 'url_fuente', true );

        // Comprobamos si se ha introducido nuestro meta-dato
        if ( $url_fuente ) {
            // Añadimosnuestro código al final del artículo
            $content .= '<br></br><strong>Fuente de la entrada:</strong><a href="' . esc_url( $url_fuente ) . '" target="_blank">' .
                esc_url( $url_fuente ) .
                '</a>';
        }
    }
    // Devolvemos a WP nuestrocontenido editado
    return $content;
}
// Anclamos la función al código de WP para que se ejecute cuando debe
add_action( 'the_content', 'imprimir_fuente_entrada' );
```

Y tachán! Ya estaremos imprimiendo el link a la fuente de nuestro contenido si lo indicamos:\
![Ejemplo metadato extra WP](/old-posts-images/2013/10/ejemplo_metadato_extra_wp.png)

Espero que os haya resultado interesante y útil. No dudéis en comentar!

<!--kg-card-end: markdown-->
