---
title: Making APIs with Node and Express
date: 2016-12-11
lastmod: 2016-12-17
tags:
  - NodeJS
  - ExpressJS
  - API
  - JavaScript
---

<!--kg-card-begin: markdown-->

I'm going to make a simple API with [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/), specifically an API for a TODOs app.

## Project Boilerplate

So I start a new Node project with the name `another-todo-api` in my terminal

```bash
mkdir another-todo-api && cd $_
git init
echo 'Another boring TODO API' > README.md
npm init -y
echo 'node_modules
*.log' >> .gitignore
npm i -S express
git add .
git commit -m 'First commit'
```

_**Note:** `npm i -S` is the same as `npm install --save` but in the shorter way._

Simple! I've started a new git repo with an empty README file and a new npm package that has express as a dependency. Let's play a little with Express.

I like to have all my source code inside a `src` folder:

```bash
mkdir src
touch src/index.js
```

### `src/index.js`

```javascript
const express = require("express");
const app = express();

module.exports = app;
```

_**Note:** Due to the coolness of this article all the javascript code will be shown in ES2015 (So it's recommended to use Node v6 or later) and I'll be using [Standard Code Style](http://standardjs.com/index.html) for the javascript._

Now to run the server I don't like to start it from the `index.js` file directly, instead, I prefer to run it through an external bin file (like [Express does in its generator](https://github.com/expressjs/generator/blob/d07ce53595086dd07efb100279a7b7addc059418/templates/js/www)).

### `bin/www`

```javascript
#!/usr/bin/env node
/**
 * Created from https://github.com/expressjs/generator/blob/d07ce53595086dd07efb100279a7b7addc059418/templates/js/www
 */

/**
 * Module dependencies.
 */
const http = require("http");
const debug = require("debug")("another-todo:server");
const app = require("../src");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
```

And then bind this file to my npm scripts.

### `package.json`

```json
  ...
  "scripts": {
    "start": "set DEBUG=another-todo:* && node bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
```

Also I'll need the package [`debug`](https://www.npmjs.com/package/debug) as dependency of my project due that I'm using it in my `www` file:

```bash
npm i -S debug
```

After that I can try my brand new Express server:

```bash
npm start

> another-todo-api@0.0.0 start /develop/another-todo-api
> set DEBUG=another-todo:* && node bin/www

  another-todo:server Listening on port 3000 +0ms
```

By default this little guy should be listening on the port `3000` of my computer. If I access with some browser to [`http://localhost:3000`](http://localhost:3000) I'll receive a sad `Cannot GET /`.

## [Express Router](http://expressjs.com/en/4x/api.html#router)

Time to make this guy have some voice to being able to reply me when I ask for something. For that I'll use the Express Routers to build up my TODO API pieces.

### `src/v1/index.js`

```javascript
const router = require("express").Router();

router.route("/").get((req, res, next) => {
  return res.json({
    message: "Let's TODO!",
  });
});

module.exports = router;
```

_**Note:** that thing of `v1` is because it's a good practice to implement a version system in APIs._

Just a simple reply to a GET request, if I go to [`http://localhost:3000`](http://localhost:3000) again, nothing happens... Because I need to mount this router path in my Express app.

### `src/index.js`

```javascript
const express = require("express");
const app = express();
const v1 = require("./v1");

/**
 * Routes
 */
app.use("/v1", v1);

module.exports = app;
```

This would work just fine! If I visit [`http://localhost:3000/v1`](http://localhost:3000/v1) this thing will have voice now:

```json
{ "message": "Let's TODO!" }
```

## [Middlewares](http://expressjs.com/en/guide/using-middleware.html)

Now I'm going to add some middleware to avoid contact with Systems that doesn't support JSON format.

### `src/index.js`

```javascript
const express = require('express')
const app = express()
const v1 = require('./v1')

/**
 * Ensure JSON acceptance
 */
app.use((req, res, next) => {
  let err

  if (!req.accepts('json')) {
    err = new Error('Not Acceptable')
    err.status = 406
  }

  return next(err)
})

/**
 * Routes
 */
...
```

Now that I have a middleware that is returning an error I can test it with [`curl`](https://curl.haxx.se/) (probably you already have it in your terminal).

```bash
curl -i -H "Accept: text" localhost:3000

HTTP/1.1 406 Not Acceptable
X-Powered-By: Express
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1052
Date: Sun, 11 Dec 2016 18:40:03 GMT
Connection: keep-alive

Error: Not Acceptable<br> &nbsp; &nbsp;at app.use (/develop/another-todo-api/src/index.js:9:11)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/develop/another-todo-api/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at trim_prefix (/develop/another-todo-api/node_modules/express/lib/router/index.js:312:13)<br> &nbsp; &nbsp;at /develop/another-todo-api/node_modules/express/lib/router/index.js:280:7<br> &nbsp; &nbsp;at Function.process_params (/develop/another-todo-api/node_modules/express/lib/router/index.js:330:12)<br> &nbsp; &nbsp;at next (/develop/another-todo-api/node_modules/express/lib/router/index.js:271:10)<br> &nbsp; &nbsp;at expressInit (/develop/another-todo-api/node_modules/express/lib/middleware/init.js:33:5)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/develop/another-todo-api/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at trim_prefix (/develop/another-todo-api/node_modules/express/lib/router/index.js:312:13)<br> &nbsp; &nbsp;at /develop/another-todo-api/node_modules/express/lib/router/index.js:280:7
```

_**Note:** If I try it without the `--header "Accept: text"` it will reply my with the correct response._

Mind your language young man! It's answering me in `HTML` I need to parse that reply passing it through a Error Handler .

## [ErrorHandler](http://expressjs.com/en/guide/error-handling.html)

Now that my app has errors (in the good meaning) I need a ErrorHandler on my app.

### `src/index.js`

```javascript
...
/**
 * Routes
 */
app.use('/v1', v1)

/**
 * ErrorHandler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .json({
      message: err.message,
      stack: err.stack
    })
})

module.exports = app
```

_**Note:** It's important to remember only to use that ErrorHandler only in development and try not to show so many info when it's a production environment._

If I ask my server again.

```bash
curl -i -H "Accept: text" localhost:3000

HTTP/1.1 406 Not Acceptable
X-Powered-By: Express
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1052
Date: Sun, 11 Dec 2016 18:42:12 GMT
Connection: keep-alive

{"message":"Not Acceptable","stack":"Error: Not Acceptable\n    at app.use (/develop/another-todo-api/src/index.js:9:11)\n    at Layer.handle [as handle_request] (/develop/another-todo-api/node_modules/express/lib/router/layer.js:95:5)\n
    at trim_prefix (/develop/another-todo-api/node_modules/express/lib/router/index.js:312:13)\n    at /develop/another-todo-api/node_modules/express/lib/router/index.js:280:7\n    at Function.process_params (/develop/another-todo-api/node_modules/express/lib/router/index.js:330:12)\n    at next (/develop/another-todo-api/node_modules/express/lib/router/index.js:271:10)\n    at expressInit (/develop/another-todo-api/node_modules/express/lib/middleware/init.js:33:5)\n    at Layer.handle [as handle_request] (/develop/another-todo-api/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/develop/another-todo-api/node_modules/express/lib/router/index.js:312:13)\n    at /develop/another-todo-api/node_modules/express/lib/router/index.js:280:7"}
```

Now that's a good error reply.

## Extras

I leaved some things pending on my code when building my API server, you can skip this part if you feel lazy about continue reading this crap.

### Logging with [Morgan](https://www.npmjs.com/package/morgan)

There are tons of middlewares packages for express, one very useful is Morgan, it's an HTTP request logger and it'll print in the terminal all the request that the server will receive.

```bash
npm i -S morgan
```

Then I need to _attach_ it to my app.

#### `src/index.js`

```javascript
const express = require('express')
const logger = require('morgan')
const app = express()
const v1 = require('./v1')

/**
 * Middlewares
 */
app.use(logger('dev'))

...
```

Now if I run my server and make some requests to it:

```bash
npm start

> another-todo-api@0.0.0 start /develop/another-todo-api
> set DEBUG=another-todo:* && node bin/www

  another-todo:server Listening on port 3000 +0ms
GET / 404 5.469 ms - 13
GET /favicon.ico 404 0.905 ms - 24
GET /v1 200 2.275 ms - 25
```

### Linting

I said that I was using [Standar code style](http://standardjs.com/) fot the javascript code but I didn't bother to make me sure that this code style get used every time someone writes code on this project. The best way to do this is with some linter and for this I'm going to use [ESLint](http://eslint.org/).

First I need to install my development dependencies (because this tools are not going to be used in production):

```bash
npm i -D eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise
```

_**Note:** `npm i -D` is the same as `npm install --save-dev`._

Now I need to define some [configuration file](http://eslint.org/docs/user-guide/configuring) on my project code.

#### `.eslintrc`

```json
{
  "extends": "standard"
}
```

_**Note:** Just that!_

And I'm going to add a new npm script.

#### `package.json`

```json
...
  "scripts": {
    "lint": "eslint **/*.js",
    "start": "set DEBUG=another-todo:* && node bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
...
```

Time to try it.

```bash
npm run lint

> another-todo-api@0.0.0 lint /develop/another-todo-api
> eslint **/*.js
```

_**Note:** If nothing happens is because there's no errors, you can try to reproduce an error by adding some `;` in some of the JS files._

There are several plugins for linting the code _on the fly_ in the text editor, so by this way you don't need to run the linting npm script. In my case I use [Atom](https://atom.io/) with [linter](https://atom.io/packages/linter) and [linter-eslint](https://atom.io/packages/linter-eslint) packages.

### [Editorconfig](http://editorconfig.org/)

This is a very important tool, it avoids a lot of noise between commits on git or git diffs. Also it helps to keep the code format homogeneous among the project.

#### `.editorconfig`

```ini
# EditorConfig is awesome: http://EditorConfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

As for the linting there is also plugins available for the usuals text editors. In the case of Atom there is the [editorconfig](https://atom.io/packages/editorconfig) package.

### [Yarn](https://yarnpkg.com/)

Not long ago Yarn, a new dependency manager, got released and it's fully compatible with npm. Only needs to be installed and then just:

```bash
yarn
```

_**Note:** It is the same as `yarn install` that is the same as `npm install`. You can check the [Yarn vs. NPM command comparison](https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison)._

There will appear a new file called `yarn.lock` that's info used by Yarn to improve the timing installing dependencies and if you red the first lines of the file all will be _Crystal Clear_:

```
# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
```

From here I can start using Yarn instead NPM for dependencies and NPM scripts.

## Enough!!!

This post is long enough to bore you so I'm going to stop here. Later!

Oh! Yes... you can check this code on the [another-todo-api GitHub repo](https://github.com/AlbertoFdzM/another-todo-api/tree/post/01).

<!--kg-card-end: markdown-->
