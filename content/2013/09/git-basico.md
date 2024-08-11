---
title: Git - Básico
date: 2013-09-23
lastmod: 2016-01-11
tags:
  - Git
---

<!--kg-card-begin: markdown-->

Voy a empezar a relatar con este articulo el uso de un [sistema de control de versiones](http://es.wikipedia.org/wiki/Programas_para_control_de_versiones "Wiki: Sistemas de Control de Versiones") (CVS/SCV) muy conocido por los desarrolladores web, ese sistema tiene el nombre de [Git](http://git-scm.com/ "Web de Git"). Para empezar diremos que este sistema se utiliza por **linea de comandos** y aunque ya se han desarrollado muchos programas que facilitan una interfaz gráfica para su uso, estos programas siguen usan esta linea de comandos internamente. Por lo que lo que más te conviene tanto a ti como a mi es saber que hacen esos programas o cómo realizar esas acciones sin necesidad de interfaz gráfica, y de este modo, **entender como funciona Git**.

## Cualidad principal de Git

Git tiene una cualidad que lo diferencia de los demás sistemas de control de versiones, y una de las principales es la recopilación de **imágenes completas del repositorio**, quiere decir, que cada vez que demos de alta cambios en nuestro sistema de versiones para un repositorio en concreto Git generará una instantánea de como está cada archivo exactamente en ese momento. Otros sistemas simplemente hacen la “foto” al fichero que se ha modificado, algo que para algunos resulta más complicado y para otros menos engorroso, pero yo ahí no me meto.

## Práctica

Creo que una de las formas más sencillas de aprender es ir trabajando a medida que se expone información, por lo que se irán explicando parte por parte cada tema y después realizaremos un ejemplo real para una buena asimilación de los conceptos sobre Git. Empecemos!

### Instalando Git

Lo primero de todo, como es lógico, es que instales el **cliente Git** para poder utilizarlo. Lo puedes bajar fácilmente [aquí](http://git-scm.com/ "Página de Git").

Durante la instalación nos preguntará varias cosas como si queremos añadirlo al *Path* o que tipo de *cliente SSH* querremos usar, te aconsejo que elijas las recomendadas y que añadas Git al path para poder usarlo en linea de comandos (*cmd*) sin tener que hacer referencia a su ruta. Una vez instalado, podrás comprobar esto ultimo que he dicho abriendo una consola de comandos (`Windows` **+** `R`, escribir `cmd` y pulsar `Intro`) y escribiendo lo siguiente:

`git --version`

Esto lo que hará será mostrarte la versión de Git que haya instalada actualmente en tu sistema, si por el contrario te indica que el comando no se reconoce, querrá decir que o bien no has instalado Git o bien no tienes la ruta en el Path. Suponiendo que sí tienes instalado Git (algo bastante sencillo de hacer) puedes comprobar que lo has añadido al Path de la siguiente forma:

`echo %PATH%`

Te imprimirá un chorizo de palabras que son los directorios que tienes referenciados en tu Path, y entre ellos deberás tener algo así `C:\PROGRAM FILES\Git\cmd`. Si no encuentras ninguna ruta parecida quiere decir que no lo has añadido. En este caso, puedes reinstalarlo, añadirlo a tu Path manualmente o referenciarlo cada vez que quieras usarlo.

### El primer repositorio

Empecemos situándonos en una carpeta vacía y dando de alta un **nuevo repositorio** con el comando `git init`:

```bash
# Nos movemos a la ruta que deseemos
cd C:

# Creamos un nuevo directorio
mkdir aprendegit
cd aprendegit

# Damos de alta un nuevo repositorio Git
git init
```

A continuación deberíamos ver un mensaje indicando que se ha inicializado nuestro repositorio en el directorio en el que nos encontramos creándose una carpeta llamada *.git*, está carpeta contendrá toda la información que Git necesita para hacer un seguimiento de nuestro proyecto. Bien, ahora que ya tenemos nuestro repositorio funcionando vamos a ver si tenemos algún cambio con el comando `git status`:

```bash
# Comrpobamos si se han efectuado cambios en nuestro repositorio
git status
```

Lo más seguro es que nos devuelva la siguiente respuesta:

```bash
# On branch master
#
# Initial commit
#
nothing to commit (create/copy files and use "git add" to track)
```

Aquí tenemos un poquito de información sobre nuestro repositorio si te fijas nos está indicando la **rama** en la que estamos actualmente `# On branch master`, por defecto, cuando Git da de alta un nuevo repositorio, siempre crea una **rama principal** llamada *master*, digamos que este sería el tronco central de nuestro árbol o futuro árbol de versiones.

También nos informa del **commit** (punto de versionado) en el que nos encontramos `# Initial commit`, en este caso, en el primer commit.

Despues de esta info lo que tenemos es un mensaje indicando los cambios que se han efectuado, en nuestro caso, ninguno `nothing to commit`.

### Tu primer commit

Vamos a crear el archivo *index.html* en nuestra carpeta del proyecto *aprendegit*:

`<p>Hola Mundo</p>`

Si ahora volvemos a ejecutar el comando de antes `git status`:

```bash
git status

# On branch master
#
# Initial commit
#
# Untracked files:
#   (use "git add ..." to include in what will be committed)
#
#       index.html
nothing added to commit but untracked files present (use "git add" to track)
```

Veremos que ahora Git nos indica que ha localizado un archivo que **no está bajo seguimiento**, esto es porque Git no añade los archivos que incluyamos en nuestro proyecto al repositorio a menos que nosotros se lo digamos, de este modo se evita añadir archivos por error o indeseados al repositorio. Vamos a añadir el archvio *index.html* a nuestro repositorio para que Git pueda realizar un seguimiento sobre él utilizando el comando `git add`, esto también hará que Git deje el archivo preparado para ser commitado:

`git add index.html`

Volvamos a ver que ha pasado si miramos los cambios de nuestro repositorio:

```bash
git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#   (use "git rm --cached ..." to unstage)
#
#       new file:   index.html
```

Ahora Git nos ha indicado los archivos que hemos preparado para commitar, vamos a preparar nuestra primera fotografía del repositorio o hablando en términos de Git o de versionado, vamos a realizar nuestro **primer commit**, Esto lo haremos con el comando `git commit`:

```bash
git commit -m "Mi primer commit"
[master (root-commit) c55a560] Mi primer commit
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
```

Si te das cuenta hemos incluido un mensaje informativo junto con la instantánea que acabamos de registrar con el parámetro `-m "mensaje"`, de este modo podremos explicar o hacer referencia a los cambios efectuados en esa instantánea.

Si ahora volvermos a editar *index.html*:

```html
Hola Mundo
Adios Mundo
```

Y comprobamos los cambios de nuestro repositorio:

```bash
git status
# On branch master
# Changes not staged for commit:
#   (use "git add ..." to update what will be committed)
#   (use "git checkout -- ..." to discard changes in working directory)
#
#       modified:   index.html
#
no changes added to commit (use "git add" and/or "git commit -a")
```

Veremos que ahora nos indica que el archivo *index.html* ha sido modificado con respecto al último commit. Para grabar estos cambios tan sólo tendremos que repetir los pasos anteriores:

```bash
# Preparamos nuestro archivo para ser commitado
git add index.html
# Commitamos los cambios realizados
git commit -m "Mi segundo commit"
[master 29ed3cc] Mi segundo commit
 1 file changed, 1 insertions(+)
```

Y ya habremos realizado nuestra segunda instantánea en nuestro repositorio.

<!--kg-card-end: markdown-->

