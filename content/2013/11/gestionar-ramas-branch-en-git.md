---
title: Gestionar ramas (branch) en Git
date: 2013-11-18
lastmod: 2024-08-11
tags:
  - Git
---

<!--kg-card-begin: markdown-->

Una de las cualidades principales de los sistemas de control de versiones es la **gestión del código en ramas** permitiendo modificaciones del código en paralelo. En concreto vamos a abordar la gestión de ramas o, como se las llama generalmente, _braches_ en Git. Empecemos!

## Dividiendonos en ramas (branch)

Ya hemos visto **[cómo commitar](/2013/09/git-basico/ "Git – Básico")** (Realizar un `commit`) nuestros cambios al repositorio para que queden registrados en el timeline. Ahora supongamos que tenemos un código medianamente decente que podamos liberar para su uso en _producción_, lo lógico sería que los futuros commits que vayamos a realizar no los realicemos directamente sobre ese código estable ya podría resultar perjudicial para la estabilidad de nuestro proyecto. Por ello, podemos crear **ramas** en las que seguir haciendo que nuestro proyecto crezca sin comprometer a las partes estables ya desarrolladas.

Por defecto, Git, llama a la rama principal _master_, está rama tiende a usarse sólo para albergar código estable, por otro lado se suele establecer una rama extra, llamada _develop_ en la que se va implementando el código hasta que tengamos un software estable.

Empecemos con un pequeño ejemplo para **crear una nueva rama en Git**:

```bash
# Pedimos a Git que cree una nueva rama
git branch develop
# Listamos las ramas que tiene nuestro repositorio
git branch
  develop
* master
# Y por último nos cambiamos a la rama que acabamos de crear
git checkout develop
Switched to branch 'develop'
```

Con esto ya tedríamos una nueva rama creada con el comando `git branch` (_develop_), y también estaríamos situados en ella usando el comando `git checkout`, esto quiere decir, que si ahora ejecutásemos alguna modificación seguida de un commit, estos cambios se registrarían sobre dicha rama. Vamos a probarlo, editamos nuestro archivo _index.html_:

```html
Hola Mundo Una rama en el mundo Adios Mundo
```

Y ahora commitamos los cambios efectuados:

```bash
# Preparamos los archivos a commitar
git add index.html
# Commitamos los cambios sobre nuestra nueva rama
git commit -m "Mi primer commit sobre develop"
```

Una vez efectuado el commit y registrados los cambios en la rama, vamos a comprobar que en nuestra rama principal, sobre la que realizamos los primeros commits, no se han reflejado los cambios que acabamos de commitar. Lo primero que debemos hacer es cambiar a nuestra primera rama:

```bash
# Cambiamos a master
git checkout master
```

Si ahora nos dirigimos a nuestro archivo _index.html_ y hemos hecho todos los pasos anteriores correctamente, veremos lo siguiente:

```html
Hola Mundo Adios Mundo
```

El archivo está tal y como lo dejamos (en _master_).

### Juntando lo bueno con lo mejor

Ahora que ya podemos llevar nuestro código de desarrollo por un lado (rama _develop_), y nuestro código estable por otro (rama _master_), nos queda saber cómo podemos **implementar un código entre ramas en Git** para que ambas reflejen los cambios, de esta manera podremos coger las modificaciones efectuadas en _develop_ cuando por fin tengamos un código estable e implementarlos en _master_ para tener una nueva versión con las nuevas funcionalidades y/o correcciones disponible. En esta ocasión entra en juego el comando `git merge`, que se utiliza para **unir 2 ramas en Git**. A continuación tenéis una demostración:

```bash
# No colocamos sobre la rama a la quequeremos añadir código procedente de otra rama
git checkout master
# La rama que queremos unir a nuestra rama actual
git merge develop
Updating 6851219..f0486d0
Fast-forward
 index.html | 1 +
 1 file changed, 1 insertion(+)
```

Por lo que si ahora consultamos nuestro archivo _index.html_ desde nuestra rama _master_ tendrá el mismo código que la rama _develop_.

Para ayudaros a comprender que es lo que hemos hecho hasta ahora podéis comprobar el siguiente gráfico:\
![ejemplo Git merge](/old-posts-images/2013/09/ejemplo_Git_merge.png)

### Ramas conflictivas

Puede suceder que cuando queramos unir 2 ramas en Git estas entren en conflicto, esto sucede cuando **ambas ramas tienen commits diferentes**. Vamos a simular dicho escenario en nuestro repositorio Git, primero editamos el archivo _index.html_ de nuestra rama _master_:

`<p>Comenzamos de cero</p>`

Y ahora commitamos nuestros cambios en _master_ y cambiamos a nuestra rama _develop_:

```bash
git add index.html
git commit -m "Reseteando master"
git checkout develop
```

Ahora que nos encontramos en _develop_ vamos a editar también el archivo _index.html_ para que entre en conflicto con _master_:

```html
Hola Mundo Una rama en el mundo Aprendiendo Git Adios Mundo
```

Y commitamos los cambios efectuados sobre _develop_:

```bash
git add index.html
git commit -m "Añadido código a index.html"
```

Hemos hecho modificaciones muy diferentes sobre ambas ramas para que al intentar unirlas (realizar un _merge_) entren en conflicto, ya que si se trata de modificaciones leves y fáciles de resolver Git las resolverá por nosotros, por poneros un ejemplo, si en vez de haber sustituido todo el contenido del archivo _index.html_ de la rama _master_ hubiéramos incluido simplemente código en las primera linea, y por otro lado, al archivo _index.html_ de la rama _develop_ le hubiéramos añadido código a la última linea, en el momento de haber realizado un _merge_ no surgirían conflictos, ya que Git incluiría ambas modificaciones, tanto el código añadido al comienzo como el que se incluyó en el final de línea.

Volviendo a nuestra situación actual tendríamos un conflicto si intentásemos unir ambas ramas. Creo que la mejor manera de representar esta situación es mediante un gráfico:\
![ejemplo Git ramas conflictivas](/old-posts-images/2013/09/ejemplo_Git_ramas_conflictivas.png)

Cuando se da la situación descrita en la imagen entre 2 ramas que queremos unir surgen diferencias que hay que solventar. Vamos a ver que pasa si le decimos a Git que las una:

```bash
git checkout master
git merge develop
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

**Git no cancela el _merge_** si no que edita el archivo resultante (_index.html_) para que nosotros solventemos los conflictos. Vamos a echarle un ojo a _index.html_.

Cuando Git detecta un conflicto durante un merge lo refleja entre estas marcas `>>>>>>` e indica a quién pertenece cada código, en este caso a _HEAD_ que es la referencia para _master_ y a _develop_, y separa ambos códigos con `=======`. Para resolver el conflicto nosotros simplemente tendremos que editar este archivo quitando las marcas que ha dejado Git y poniendo el código que deseemos commitar, una vez hecha la modificación, commitamos la edición para dar fin a nuestro _merge_.

Editamos nuestro _index.html_:

```html
Hola Mundo Comenzamos de cero
```

Y commitamos nuestros cambios para finalizar el _merge_:

```bash
git add index.html
git commit -m "Merge branch 'develop'"
```

Y así quedaría la imagen de nuestro repositorio:\
![ejemplo Git conflictos resueltos](/old-posts-images/2013/09/ejemplo_Git_conflictos_resueltos.png)

Hasta aquí la teoría básica sobre el **uso de ramas en Git**. No dudéis en comentar.

<!--kg-card-end: markdown-->
