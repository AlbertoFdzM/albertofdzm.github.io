---
title: Añadir o eliminar datos de contacto a los usuarios en WordPress
date: 2013-09-30
lastmod: 2016-01-11
tags:
  - WordPress
---

<!--kg-card-begin: markdown-->

Los usuarios registrados en WordPress tienen la posibilidad de informar diferentes métodos de contacto en su página de perfil:

- Correo electrónico
- Web
- [AIM](http://www.aim.com/ "Web de AIM")
- [Yahoo IM](http://es.messenger.yahoo.com/ "Yahoo messenger")
- [Jabber](http://www.jabber.org/ "Web de Jabber") / [Google Talk](http://www.google.es/talk/intl/es/about.html "Acerca de Google Talk").

Gracias a unas sencillas funciones y [filtros](http://codex.wordpress.org/es:Plugin_API#Filtros "Definición de Filtro en WordPress") en WordPress es posible modificar estos campos para mostrar nuevos o eliminar los que no deseemos.

El **filtro** en concreto que vamos a usar para editar estos **campos / metas de contacto** es `user_contactmethods`  que es el que provee estos campos a la hora de arrancarse en WordPress las funcionalidades para usuarios, así pues empecemos con un ejemplo para que lo entiendas mejor. Pongamos que quieres añadir una nueva forma de contacto para los usuarios que no está registrada en WordPress, lo que tendríamos que hacer es editar nuestro archivo functions.php y añadir el siguiente código para modificar el funcionamiento de nuestro WordPress:

```php
/* Creamos una nueva función a la que le pasaremos el parámetro que nos va a proporcionar
el filtro "user_contactmethods" que contiene los Metas de Contacto de Usuario */
function custom_contact_fields( $contact_meta ) {
    // Comprobamos que ningun Plugin o Tema hayan añadido ya el meta de Twitter
    if ( !isset( $contact_meta['twitter'] ) ) {
        // Si aún no se ha dado de alta lo registramos con el título "Usuario de Twitter"
        $contact_meta['twitter'] = 'Usuario de Twitter';
    }

    // Devolvemos el Array con los datos modificados
    return $contact_meta;
}
/* Anclamos la función que hemos creado al filtro de WordPress para que pueda cambiar
los datos que hemos indicado */
add_filter( 'user_contactmethods', 'custom_contact_fields' );
```

Ahora si añadimos dicho código a nuestro WordPress y nos dirigimos a la ventana de edición de perfil de usuario veremos que aparece un campo nuevo en la sección de **Información de Contacto** con el título de **Usuario de Twitter**, desde ese momento nuestros usuarios podrán informar su Twitter en los datos de su perfil.

Si por el contrario lo que queremos es eliminar alguno de los metas de contacto presentes en WordPress lo que tendremos que indicar en nuestro código si queremos quitar la cuenta de Yahoo IM (Por ejemplo) será lo siguiente:

```php
function custom_contact_fields( $contact_meta ) {
    // Comprobamos si el meta que vamos a dar de baja está definido
    if ( isset( $contact_meta['yim'] ) ) {
        // Si el meta que queremos eliminar está definido lo damos de baja
        unset( $contact_meta['yim'] );
    }
    return $contact_meta;
}
add_filter( 'user_contactmethods', 'custom_contact_fields' );
```

De este modo con el ejemplo mostrado anteriormente estaremos dando de alta el meta de Twitter para los datos de usuario y al mismo tiempo también estaremos dando de baja la utilización del meta de Yahoo IM. Es conveniente realizar todos estos cambios en la misma función ya que así ahorramos tiempo de procesamiento evitando llamadas repetidas al código.

Después con los datos que hemos definido nuevos podríamos desplegarlos al igual que cualquier otro meta de usuario, pongo un ejemplo de mostrar el Twitter del autor en un post normal:

```php
if ( is_singular() ) {
  echo get_the_author_meta( 'twitter', get_author_meta( 'ID' ) );
}
```

Se pueden añadir nuevos campos que se utilizan bastante actualmente cómo por ejemplo la URL del perfil a Facebook, la URL de InfoJobs, el perfil de Google+, etc.

<!--kg-card-end: markdown-->
