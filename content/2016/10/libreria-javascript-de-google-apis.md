---
title: Librería JavaScript de Google APIs
date: 2016-10-17
lastmod: 2016-10-17
tags:
  - GoogleAPI
---

<!--kg-card-begin: markdown-->

*Google* ofrece a los desarrolladores una [librería JavaScript](js-library) que permite ejecutar llamadas a su [catálogo de APIs](api-catalog) fácilmente.

El caso es que hace poco he tenido que pelearme un poco con las **Google APIs** por un proyecto en mi trabajo y decidido escribir un blog para las almas en pena que tengan que pasar por lo mal explicado que está todo (quizá yo sea muy cateto).

## Empieza Siempre con lo Básico

Las Google APIs están siempre creciendo y evolucionando, cada vez es más fácil utilizarlas (aunque a veces parezca que no), pero en mi opinión Google no tiene muy claro por dónde empezar a explicarte cómo usarlas. Sí es cierto que están reestructurando toda [su documentación](google-developers) y tienen mucho que hacer, pero yo aún no he encontrado una página fina dónde te lo expliquen como debe ser.

Así pues lo que yo he hecho ha sido empezar con lo más básico, ir desmigando cada parte y después juntarlo todo. Empecemos!

### Las APIs de Google y su Catálogo

Cómo bien he dicho antes [Google dispone de un catálogo de APIs](api-catalog) en el que lista la mayoría de sus APIs (Algunas de sus APIs aún no se encuentran en este catálogo, como por ejemplo Google Keep) y cada uno de los métodos que estás proveen, Google Books, Calendar, Blogger, Gmail, Analytics, Tasks, etc. Lo más fácil para empezar a conocer las APIs de Google es trastear con su catálogo haciendo llamadas y probando los distintos métodos de las APIs en las que estés interesado.

### Estructura de una API en el Catálogo de Google

Prueba con la [API de Google Translator](google-translator-api). Como puedes ver, cuando accedemos a una de las APIs del catálogo se despliega una tabla con un listado de todos los métodos que engloba.

Uno de los métodos más fáciles de usar de la API de Google Translator es el de [`language.detections.list`](language-detection-list) que se utiliza para detectar el idioma del texto que introduzcas (La descripción de cada método se puede ver en la tabla de la API).

Si accedes a la vista para probar el método te vas a encontrar con 2 campos, *q* y *fields*, con una pequeña descripción indicando para que sirve cada campo. El parámetro *q* se encarga de recoger el texto que queremos analizar para reconocer el idioma y *fields* es un campo que vas a encontrar en todos los métodos de las APIs de Google y se utiliza para filtrar qué datos que vamos a recibir (Por ejemplo: si la respuesta de la API que estás usando devolviese los campos `nombre` y `apellidos` podrías indicar en el parámetro *fields* únicamente `nombre` y de este modo al realizar la llamada a la API sólo recibirías el campo `nombre`) de este modo reduces la cantidad de datos de transferencia (que va a repercutir en las cuotas de uso de las APIs de Google y en la velocidad de tu aplicación).

<!--kg-card-end: markdown-->

