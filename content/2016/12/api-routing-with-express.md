---
title: API Routing with Express
date: 2016-12-17
lastmod: 2017-09-06
tags:
  - ExpressJS
  - NodeJS
  - API
  - JavaScript
  - curl
---

<!--kg-card-begin: markdown-->

_**Note:** This is the 2nd post of a series of post about **Building APIs With Express**._

Based on my last post about [Making APIs with Node and Express](/2016/12/making-apis-with-node-and-express/) I'll continue developing over the [generated code](https://github.com/AlbertoFdzM/another-todo-api/tree/post/01).

So, [I left the basement for my TODO API prepared](/2016/12/making-apis-with-node-and-express/). Now it's time to work in the different endpoints and HTTP verbs/methods that this API is going to use.

## `/v1/tasks`

I'm going to start building my API's endpoints with **Tasks Collection**.

### `[GET] /v1/tasks`

First thing I need is to `GET` the list of tasks from my so innovative TODO API and I think that the best way to build it is by creating a **new isolated express router instance**.

#### `src/v1/tasks.js`

```javascript
const router = require("express").Router();

/**
 * TODO: Store data in DB.
 */
let tasks = [
  {
    description: "Another task",
    isDone: false,
    createdAt: Date.now(),
  },
];

router
  .route("/")

  .get((req, res, next) => {
    return res.json(tasks);
  });

module.exports = router;
```

Easy peasy! Now I need to **mount** that router on my API, I'm going to remove the old `Let's TODO!` message:

#### `src/v1/index.js`

```javascript
const router = require("express").Router();
const tasks = require("./tasks");

router.use("/tasks", tasks);

module.exports = router;
```

Let's try the new endpoint (Now that I have implemented `yarn` I can run the server with \`\` `yarn start` instead of `npm start`):

```bash
curl -X GET localhost:3000/v1/tasks
[
   {
      "createdAt" : 1481985039988,
      "isDone" : false,
      "description" : "Another task"
   }
]
```

_**Note:** It's needed to restart the server if there have been changes in the code while it is running to see the changes._

Now I'll continue with the creation of a new task

### `[POST] /v1/tasks`

It should be in the same router instance the `GET` method is. This time I'll need a new middleware to parse correctly the [request body](http://expressjs.com/en/4x/api.html#req.body), [body-parser](https://www.npmjs.com/package/body-parser) (this time I'll install it with Yarn).

```bash
yarn add body-parser
```

_**Note:** Same as execute `npm i -S body-parser`_

And now it needs to be attached to the app

#### `src/index.js`

```javascript
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const v1 = require('./v1')

/**
 * Middlewares
 */
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

...
```

_**Note:** It will inject data from the request into `req.body`._

And now the request handler.

#### `src/v1/tasks.js`

```javascript
...

router.route('/')

  .get((req, res, next) => {
    return res.json(tasks)
  })

  .post((req, res, next) => {
    const newTask = req.body

    newTask.createdAt = Date.now()
    newTask.isDone = false
    tasks.push(newTask)

    return res.status(201).json(newTask)
  })

module.exports = router
```

_**Note:** Take advantage of the [HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)._

Done, let's try again with a `POST` request this time:

```bash
curl -X POST -H "Content-Type: application/json" --data '{"description": "Also another task more"}' localhost:3000/v1/tasks
{"description":"Also another task more","createdAt":1481986821539}

curl -X GET localhost:3000/v1/tasks
[
   {
      "createdAt" : 1481986807819,
      "isDone" : false,
      "description" : "Another task"
   },
   {
      "createdAt" : 1481986821539,
      "isDone" : false,
      "description" : "Also another task more"
   }
]
```

Time to delete! Due this is an endpoint pointing a collection when it receives a `DELETE` request **it should delete all items of the collection**.

### `[DELETE] /v1/tasks`

#### `src/v1/tasks.js`

```javascript
...

  .post((req, res, next) => {
    const newTask = req.body

    newTask.createdAt = Date.now()
    tasks.push(newTask)

    return res.json(newTask)
  })

  .delete((req, res, next) => {
    tasks = []

    res.status(204).end()
  })

module.exports = router
```

Delete all the things!

```bash
curl -X DELETE -i localhost:3000/v1/tasks

HTTP/1.1 204 No Content
X-Powered-By: Express
ETag: W/"2-11FxOYiYfpMxmANj4kGJzg"
Date: Sat, 17 Dec 2016 17:13:07 GMT
Connection: keep-alive
```

I am done with this endpoint.

## `/v1/tasks/:taskId`

Now it's time to handle the single task endpoint. Here I'm going to take advantage of an [Express feature to parse URLs, for this case, to treat a segment of the URL as a parameter](http://expressjs.com/en/4x/api.html#app.param) and assigning it the name `taskId`.

### `taskId` param

I am going to define a new param for the tasks router to get a certain task passing the task ID in the URL.

#### `src/v1/tasks.js`

```javascript
...

router.route('/')

...

router.param('taskId', (req, res, next, id) => {
  const task = tasks[id]
  let err

  if (!task) {
    err = new Error('Task not found')
    err.status = 404
  } else {
    req.task = task
  }

  return next(err)
})

module.exports = router
```

### `[GET] /v1/tasks/:taskId`

Then I only need to reply with the found task in a new endpoint listening to any request aimed to `/v1/tasks/:taskId` meaning by `:taskId` whatever comes after the slash (IE: `/v1/tasks/my-task-id` OR `/v1/tasks/01234`).

#### `src/v1/tasks.js`

```javascript
...

router.param('taskId', (req, res, next, id) => {
  ...
})


router.route('/:taskId')

  .get((req, res, next) => {
    return res.json(req.task)
  })

module.exports = router
```

Let's try it

```bash
curl -X GET localhost:3000/v1/tasks/0
{
   "description" : "Another task",
   "isDone" : false,
   "createdAt" : 1481996187751
}

curl -X GET -i localhost:3000/v1/tasks/1234

HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 1082
ETag: W/"43a-4d6NK29IKrV0B3jSAdQGvA"
Date: Sat, 17 Dec 2016 17:46:36 GMT
Connection: keep-alive
{
   "stack" : "Error: Task not found\n    at router.param (/develop/another-todo-api/src/v1/tasks.js:38:11)\n    at paramCallback (/develop/another-todo-api/node_modules/express/lib/router/index.js:404:7)\n    at param (/develop/another-todo-api/node_modules/express/lib/router/index.js:384:5)\n    at Function.process_params (/develop/another-todo-api/node_modules/express/lib/router/index.js:410:3)\n    at next (/develop/another-todo-api/node_modules/express/lib/router/index.js:271:10)\n    at Function.handle (/develop/another-todo-api/node_modules/express/lib/router/index.js:176:3)\n    at router (/develop/another-todo-api/node_modules/express/lib/router/index.js:46:12)\n    at Layer.handle [as handle_request] (/develop/another-todo-api/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/develop/another-todo-api/node_modules/express/lib/router/index.js:312:13)\n    at /develop/another-todo-api/node_modules/express/lib/router/index.js:280:7",
   "message" : "Task not found"
}
```

### `[POST] /v1/tasks/:taskId`

Now it's important to pay attention here because the `POST` request to a specified resource in an API REST by definition should **override completely the resource**, meaning that if:\
I do a `GET` to `/v1/tasks/0` receiving:

```json
{
  "description": "Another task",
  "isDone": false,
  "createdAt": 1481996187751
}
```

If I do a `POST` to `/v1/tasks/0` with this data:

```json
{ "isDone": true }
```

The next time I do a `GET` to `/v1/tasks/0` I'll receive the next response:

```json
{ "isDone": true }
```

**The proper way a client should make a `POST` to an API resource is by providing all the resource info in the request to avoid the lose of info**.

Now go back to code!

#### `src/v1/tasks.js`

```javascript
...
  .post((req, res, next) => {
    const updatedTask = req.body

    tasks[req.params.taskId] = updatedTask

    return res.json(updatedTask)
  })
...
```

### `[PATCH] /v1/tasks/:taskId`

Now the **`PATCH` request is the one used to update partially a resource in an API REST**.

#### `src/v1/tasks.js`

```javascript
...
  .patch((req, res, next) => {
    for (let prop in req.body) {
      tasks[req.params.taskId][prop] = req.body[prop]
    }

    return res.json(tasks[req.params.taskId])
  })
...
```

Let's try this one with `curl`:

```bash
curl -X PATCH -H "Content-Type: application/json" --data '{"isDone": true}' localhost:3000/v1/tasks/0
{
   "isDone" : true,
   "description" : "Another task",
   "createdAt" : 1481998868351
}
```

Oh yeah!

### `[DELETE] /v1/tasks/:taskId`

I think there's no much to explain here, is pretty much the same as the `DELETE` for the whole collections instead that this one only deletes one resource.

#### `src/v1/tasks.js`

```javascript
...
  .delete((req, res, next) => {
    tasks.splice(req.params.taskId, 1)

    res.status(204).end()
  })
...
```

## End of the route

Well, I think that with this the awesome Another TODO API is completely functional, maybe I should care about that **the info isn't being stored anywhere and every time the server stops I lose it all**, but that'll be another time!

Comment and [check the code on GitHub](https://github.com/AlbertoFdzM/another-todo-api/tree/post/02)!

<!--kg-card-end: markdown-->
