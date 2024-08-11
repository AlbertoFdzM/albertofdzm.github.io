---
title: "Let's Make a Blog With Polymer: 01"
date: 2016-10-17
lastmod: 2017-04-08
tags:
  - polymer
---

<!--kg-card-begin: markdown-->

Hey, if I'm up to date with the latest web technologies I should have heard of Polymer and the new HTML technology of **web components**. So here I'm about to start the development of a **blog platform made with Polymer**.

## What I Need Before Start Developing With Polymer?

_**IMPORTANT NOTE:** This post was written using **Polymer v1.**, mind that the current version is 2 and it isn't completely compatible._

If I didn't know anything about Web Components or Polymer, I think that **I should know this things first:**

- **The 4 [Web Component's](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standars:**
- [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/)
- [HTML Imports](http://w3c.github.io/webcomponents/spec/imports/)
- [Templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element)
- [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/)
- [A Guide to Web Components](https://css-tricks.com/modular-future-web-components/) (By [Rob Dodson](https://robdodson.me/))
- [Polymer Project](https://www.polymer-project.org/1.0/start/index)

After this amount of info boiling in my head I should be ready to start thinking in made my blog platform with Polymer.

## Where Do I Start?

First things firsts, to make [the set up](https://www.polymer-project.org/1.0/start/toolbox/set-up) I need **[NodeJS](nodejs.org)** installed in my system and the **[polymer-cli](https://www.npmjs.com/package/polymer-cli)** package:

```bash
npm i -g polymer-cli
```

Also I need to have installed in my system [Bower](https://bower.io/):

```bash
npm i -g bower
```

Let's create a **New Polymer Project**:

```bash
cd $HOME/projects
mkdir blog-app && cd blog-app
polymer init starter-kit
```

Hell yeah! If I'm right, and the line `polymer init starter-kit` has worked, I should have a ton of fancy files in my current folder, those are the best foundations for a polymer project as far as I know. I'm going to run the project to check if everything works as expected:

```bash
polymer serve --open
```

## Let's Develop

Enough of shell commands, let's go coding something with Polymer!

### Polymer Pages

If I've read the post about [creating new page in Polymer](https://www.polymer-project.org/1.0/start/toolbox/create-a-page) then **every page of a Polymer app is also a Polymer element**. So the first thing I need for my blog is a new page element.

#### Create a New Page

I'm going to create a new page on my polymer proyect to display my posts content `src/my-post-view.html`:

```html
<link rel="import" href="../bower_components/polymer/polymer.html" />

<dom-module id="my-post-view">
  <!-- Defines the element's style and local DOM -->
  <template>
    <style>
      :host {
        display: block;
        padding: 16px;
      }
    </style>

    <h1>New view</h1>
  </template>
  <!-- Creates the element's prototype and registers it -->
  <script>
    Polymer({
      is: "my-post-view",
    });
  </script>
</dom-module>
```

#### Including the Page on the App

Now I need to include this file in my app `src/my-app.html`:

```html
...

<iron-pages
  selected="[[page]]"
  attr-for-selected="name"
  fallback-selection="view404"
  role="main"
>
  <my-view1 name="view1"></my-view1>
  <my-view2 name="view2"></my-view2>
  <my-view3 name="view3"></my-view3>
  <my-view404 name="view404"></my-view404>
  <!-- this is the important line! -->
  <my-post-view name="post-view"></my-post-view>
</iron-pages>

...
```

_**Note:** Not all the file content is included._

#### Add Page to Navigation Menu

Also I'm going to include it on the navigation menu in `src/my-app.html`:

```html
...

<!-- Drawer content -->
<app-drawer>
  <app-toolbar>Menu</app-toolbar>
  <iron-selector
    selected="[[page]]"
    attr-for-selected="name"
    class="drawer-list"
    role="navigation"
  >
    <a name="view1" href="/view1">View One</a>
    <a name="view2" href="/view2">View Two</a>
    <a name="view3" href="/view3">View Three</a>
    <a name="post-view" href="/post-view">Post View</a>
  </iron-selector>
</app-drawer>

...
```

_**Note:** Not all the file content is included._

If I've done everything right and I go to <http://localhost:8080/post-view> with my project running I should see my brand new page in my browser.

#### Registering Page as a 'fragment' for Polymer

Let's add the icing on this cake, including this page to the Polymer config to be handled during the build process `polymer.json`:

```json
...
  "fragments": [
    "src/my-view1.html",
    "src/my-view2.html",
    "src/my-view3.html",
    "src/my-view404.html",
    "src/my-post-view.html"
  ],
 ...
```

_**Note:** Not all the file content is included._

I'm done with this part, now I need to add the pieces for my post, the elements.

### Polymer Elements

#### Reusing Comunity Developed Web Components

Before creating anything new I'm going to download (and save as dependency) the `marked-element` from the [Google's Polymer Catalog](http://elements.polymer-project.org/) to format [Markdown](https://en.wikipedia.org/wiki/Markdown) code to HTML:

```bash
bower install -S PolymerElements/marked-element
```

After [read how this `marked-element` works](https://elements.polymer-project.org/elements/marked-element) let's use it on `my-post-view.html`:

```html
<link rel="import" href="../bower_components/polymer/polymer.html" />
<!-- First I import the marked-element element -->
<link
  rel="import"
  href="../bower_components/marked-element/marked-element.html"
/>

<dom-module id="my-post-view">
  <template>
    <h1>New view</h1>
    <!-- And now I use this new element -->
    <marked-element markdown="`Polymer` is **awesome**!">
      <div class="markdown-html"></div>
    </marked-element>
  </template>
  <script>
    Polymer({ is: "my-post-view" });
  </script>
</dom-module>
```

Awesome, now I can use Markdown in my posts!

#### Creating a New Polymer Element

So now that I have an element to show my posts content I want an element to display the author's info at the end of the post, I'm going to call it `author-info`. First I'm going to create the next file in my project `src\elements\author-info.html`:

```html
<!-- I need to import Polymer on my element
to being able to create a polymer element -->
<link rel="import" href="../bower_components/polymer/polymer.html" />

<!-- this dom module tag is what encapsulates my element
identifying my element by the `id` attribute-->
<dom-module id="author-info">
  <!-- here I'm going to define what is my element going
  to render when I use it -->
  <template>
    <footer>
      <h3>Author</h3>
      <strong>
        <a href="http://onlythepixel.com" rel="author">Alberto Fernandez</a>
      </strong>
      <p>Frontend web developer based in Spain, passionate about technology.</p>
    </footer>
  </template>

  <!-- then I need to tell Polymer that a new element
  has arrived to the city -->
  <script>
    Polymer({
      is: "author-info",
    });
  </script>
</dom-module>
```

Yay! Let's put it on my posts element page `my-post-view.html`:

```html
<link rel="import" href="../bower_components/polymer/polymer.html" />
<link
  rel="import"
  href="../bower_components/marked-element/marked-element.html"
/>
<!-- First I import the author-info element -->
<link rel="import" href="elements/author-info.html" />

<dom-module id="my-post-view">
  <template>
    <h1>New view</h1>
    <marked-element markdown="`Polymer` is **awesome**!">
      <div class="markdown-html"></div>
    </marked-element>
    <!-- And now I use it in my page -->
    <author-info></author-info>
  </template>
  <script>
    Polymer({ is: "my-post-view" });
  </script>
</dom-module>
```

Woah that's enough for now I think, I'll continue later. See you!

<!--kg-card-end: markdown-->
