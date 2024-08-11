---
title: Learn Cordova!
date: 2016-01-18
lastmod: 2024-08-11
tags:
  - cordova
  - mobile
---

Just a little try to cordova

## Requirements

- [NodeJS w/ npm](https://nodejs.org/)

## Getting Started :zap:

### 1. Installation :floppy_disk:

Just run a npm installation command

```bash
npm install -g cordova
```

### 2. Creating a new Project :new:

Now that you have cordova installed with npm you can create you project with the next command:

```bash
cordova create <project name>
```

### 3. Adding platform to the project

Noew lets define some platform to build our project, you can see the list of available platforms with `cordova platform`.

```bash
cordova platform add <platform name>
```

_**Note:** You can add the platform **browser** that doen't need any SDK and start developing from there dealing later with third parties SDKs._

### 4. First app run :fire:

Now it's time to try if we can run our app

```bash
cordova run <platform name>
```

_**Note:** You'll need yo have the platform SDK installed in you local machine due to run the app in the emulator_

## The hello world example :baby:

This is the simplest thing to do because when you create a project with the cordova script it already creates a similar hello world example for you so lets lest clean it to begin from 0.

Remove all the files inside `www/`.

Then create the next `www/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- With this tag we can define the content security polycy to prevent XSS, inline scripts, limit the request to only one defined URL, etc. We are going to use the recomended by cordova team. -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *"
    />
    <!-- Prevents the phone to format the phone numbers like links -->
    <meta name="format-detection" content="telephone=no" />
    <!-- Prevents Windows to highlight links with its custom styles -->
    <meta name="msapplication-tap-highlight" content="no" />
    <!-- Disables the zoom functionality and scale the app to fit all the screen -->
    <meta
      name="viewport"
      content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"
    />

    <title>Hello Cordova</title>
  </head>

  <body>
    <h1>Hello Cordova</h1>

    <script src="cordova.js"></script>
  </body>
</html>
```

As you can see we have added some metas to restrict client platforms unwanted behaviours for our app and to set the security polycy for the app. Apart of this we are importing the cordoba library to work with at the bottom of the body.

Well now we have a beautiful and unique app that says "Hello Cordova". You can try it with `cordova run`.

## Using cordova API :space_invader:

Lets play a little with the cordova API. First we need to know when the device is ready to rock, so lets create the next `www/js/app.js` file:

```javascript
// Let's define a simple app
var app = {
  init: function () {
    // Our initialization script will bind some events
    this.bindEvents();
  },

  bindEvents: function () {
    // We'll know when our machine is ready to rock
    document.addEventListener("deviceready", this.onDeviceReady, false);
  },

  onDeviceReady: function (ev) {
    // Awesome things can happen here
    // Let paint our title with a red background
    document.querySelector("h1").style.background = "red";
  },
};

// Awakening the beast
app.init();
```

Now don't forget to add the script just after the `cordoba.js` import:

```html
<script src="js/app.js"></script>
```

## Routing! :anchor:

Lets implement a routing system using [PageJS](http://visionmedia.github.io/page.js/) and [jQuery](http://jquery.com/).

Our project is going to have a new javascript file `www/js/routes.js`:

```javascript
// View switch andler to hide and show the corresponding view
function changeView(ctx, next) {
  var $viewEl = $("#" + ctx.pathname.substr(1));

  $("main > section").hide();

  // If that view does not exists shows the index
  if ($viewEl.length) {
    $viewEl.show();
  } else {
    $("#index").show();
  }

  next();
}

// Handle the first app load redirecting /index.html to /
page.redirect("/index.html", "/");

// Bind the view switcher to all routes
page("*", changeView);

page();
```

And then in our `www/index.html`:

```html
<!DOCTYPE html>
  // ...

  <style>
    main > section {
      display: none;
    }

    #index {
      display: block;
    }
  </style>
</head>
<body>

  <h1>Learning Cordova</h1>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>

  <main>
    <section id="index">
      Index
    </section>

    <section id="about">
      About
    </section>
  </main>

  <script src="cordova.js"></script>
  <script src="bower_components/page/page.js"></script>
  <script src="bower_components/jquery/dist/jquery.js"></script>

  <script src="js/app.js"></script>
  <script src="js/routes.js"></script>
</body>
<html>
```

## Plugins :nut_and_bolt:

Cordova has a [plugins catalog](https://cordova.apache.org/plugins/) developed and maintained by the cordova team and by anyone who want to contribute to the plugin catalog.

### Trying out the local notifications plugin :bell:

There's a [Cordova plugin to manage local notification for our app](https://www.npmjs.com/package/de.appplant.cordova.plugin.local-notification). To install it you have to run the next command:

```bash
cordova plugin add de.appplant.cordova.plugin.local-notification
```

Now the the plugin is installed let use it! On the `www/js/app.js` file refactor the `onDeviceReady` function:

```javascript
cordova.plugins.notification.local.schedule({
  text: "Ahoy! Cool notifications now!",
});
```

## The Goodbye :wave:

I think that this is enought for a little taste of Cordova and for a sample repo. Hope that you've enjoyed this README.

You can checkout the code on [the repo](https://github.com/AlbertoFdzM/learn-cordova)! :smile:

See you! Happy Coding! :beer:
