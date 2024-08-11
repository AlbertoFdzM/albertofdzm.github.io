---
title: Mongoose, MongoDB and Express
date: 2017-01-05
lastmod: 2017-11-15
tags:
  - ExpressJS
  - NodeJS
  - API
  - JavaScript
  - MongoDB
  - Mongoose
---

<!--kg-card-begin: markdown-->

First steps on ExpressJS API development to connect to a MongoDB database and start managing data using endpoints.

_**Note:** This is the 3rd post of a series of post about **Building APIs With Express**. Based on my last post about [API Routing with Express](/2016/12/api-routing-with-express/) I'll continue developing over the [generated code](https://github.com/AlbertoFdzM/another-todo-api/tree/post/02)._

Last time, the awesome TODO API was with a nice API Routing hierarchy, but! And this is an important but. I didn't store any kind of data for future use, it's only storing the TODOs in temporal memory so once the server stops all the info is lost.

## Requirements

For this posts, I'll need to have installed on my machine [MongoDB](https://www.mongodb.com/download-center#community) to being able to develop my API with real connections in my local environment.

_**Note:** I need to pay attention to [have my MongoDB up and running](https://docs.mongodb.com/manual/administration/install-community/) to being able to work with it._

Also, I'm going to need [Mongoose](https://www.npmjs.com/package/mongoose) as a dependency of my project, this package will help me with the DB communication and data models:

```bash
yarn add mongoose
```

## Mongoose connection to MongoDB

First I need to let mongoose connect to my local MongoDB so I'm going to create a new script to take this job.

### `src/db.js`

```javascript
const mongoose = require("mongoose");
const debug = require("debug");
const log = debug("another-todo:database");
const error = debug("another-todo:database:error");

// First I define my DB URI or
// make my script take it from the env variables
const DB_URI = process.env.DB_URI || "mongodb://localhost/another-todo";

// Define some basic methods to
// connect/disconnect to the DB
const db = {
  connect() {
    return mongoose.connect(DB_URI);
  },

  disconnect() {
    return mongoose.connection.close(() => {
      process.exit(0);
    });
  },
};

// This let mongoose use the node's default promises
mongoose.Promise = global.Promise;

// Logs for our app
mongoose.connection.on("connected", () => {
  log("Mongoose connection open to " + DB_URI);
});

// More logs...
mongoose.connection.on("disconnected", () => {
  log("Mongoose disconnected");
});

// Logs that I hope to not see
mongoose.connection.on("error", (err) => {
  error(err);
});

// Handle process terminations
// this ensures that there is any connection
// open with DB when I stop the app
process.on("SIGINT", db.disconnect).on("SIGTERM", db.disconnect);

// finally I only expose the methods to being used by my app script
module.exports = db;
```

Now I only need to use my `db` script on my app.

### `src/index.js`

```javascript
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const v1 = require('./v1')
const db = require('./db')

// Connect to DB!!
db.connect()

// Middlewares
...
```

## Mongoose Models

Now it's time to define the first mongoose model, at this moment the only model or **relevant data to store in DB** are my tasks so so I only going to need the model.

I'm going to use the same [**data structure** that I used in my last post](/2016/12/api-routing-with-express/).

### `src/models/task.js`

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// I'm going to define a new schema
// Here is where I define the properties
// that my data is going to have
// along with its validations
const taskSchema = new Schema(
  {
    // A property 'description' of type string
    // with a default to a empty string
    description: {
      type: String,
      default: "",
    },

    // And a boolean property with false as default
    isDone: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
```

_**Note:** that `timestamps` let me not having to define a property `createdAt` or `updatedAt` because it is going to add this value once that property is set to `true`._

Now is time to make use of this model in my API.

## `src\v1\tasks.js`

```javascript
const router = require("express").Router();
const Task = require("../models/task");

router
  .route("/")

  .get((req, res, next) => {
    // I exec the find without conditions
    // to retrieve all my tasks
    Task.find((err, tasks) => {
      if (err) return next(err);

      return res.json(tasks);
    });
  })

  .post((req, res, next) => {
    Task.create(req.body, (err, task) => {
      if (err) return next(err);

      return res.status(201).json(task);
    });
  })

  .delete((req, res, next) => {
    // This method is similar to find but instead
    // it removes all the occurrences
    Task.remove((err) => {
      if (err) return next(err);

      return res.status(204).end();
    });

    res.status(204).end();
  });

router.param("taskId", (req, res, next, id) => {
  // Handle to find the requested resouce
  Task.findById(id, (err, task) => {
    if (err) return next(err);

    // If the task is not found then the app returns a 404
    if (!task) {
      err = new Error("Task not found");
      err.status = 404;
    } else {
      req.task = task;
    }

    return next(err);
  });
});

router
  .route("/:taskId")

  .get((req, res, next) => {
    return res.json(req.task);
  })

  .put((req, res, next) => {
    // I'm not using req.task.update() because
    // that method doesn't return the task on the callback
    Task.findByIdAndUpdate(
      req.task.id,
      {
        $set: req.body,
      },
      {
        // Returns the updated task
        new: true,
        // Set the whole document even if we are not
        // receiving all the properties
        overwrite: true,
        // Run validations if we have them
        runValidators: true,
      },
      (err, task) => {
        if (err) return next(err);

        return res.json(task);
      }
    );
  })

  .patch((req, res, next) => {
    Task.findByIdAndUpdate(
      req.task.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
      (err, task) => {
        if (err) return next(err);

        return res.json(task);
      }
    );
  })

  .delete((req, res, next) => {
    Task.findByIdAndRemove(req.task.id, (err) => {
      if (err) return next(err);

      res.status(204).end();
    });
  });

module.exports = router;
```

_**Note:** You can check the [Mongoose API docs](http://mongoosejs.com/docs/api.html) for info about its different methods._

Now it's time to try it!

## cURL

```bash
$ curl -X GET "http://localhost:3000/v1/tasks"

[]

$ curl -X POST "http://localhost:3000/v1/tasks" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'description=test'

{
    "__v": 0,
    "updatedAt": "2017-01-05T17:53:37.066Z",
    "createdAt": "2017-01-05T17:53:37.066Z",
    "_id": "586e88217106b038d820a54e",
    "isDone": false,
    "description": "test"
}

$ curl -X POST "http://localhost:3000/v1/tasks" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'description=test'

{
    "__v": 0,
    "updatedAt": "2017-01-05T17:53:55.067Z",
    "createdAt": "2017-01-05T17:53:55.067Z",
    "_id": "586e88337106b038d820a54f",
    "isDone": false,
    "description": "test"
}
$ curl -X GET "http://localhost:3000/v1/tasks"

[
    {
        "__v": 0,
        "updatedAt": "2017-01-05T17:53:37.066Z",
        "createdAt": "2017-01-05T17:53:37.066Z",
        "_id": "586e88217106b038d820a54e",
        "isDone": false,
        "description": "test"
    },
    {
        "__v": 0,
        "updatedAt": "2017-01-05T17:53:55.067Z",
        "createdAt": "2017-01-05T17:53:55.067Z",
        "_id": "586e88337106b038d820a54f",
        "isDone": false,
        "description": "test"
    }
]

$ curl -X DELETE -i "http://localhost:3000/v1/tasks"

HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Thu, 05 Jan 2017 17:54:47 GMT
Connection: keep-alive

$ curl -X POST "http://localhost:3000/v1/tasks" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'description=test'

{
    "__v": 0,
    "updatedAt": "2017-01-05T17:54:53.555Z",
    "createdAt": "2017-01-05T17:54:53.555Z",
    "_id": "586e886d7106b038d820a550",
    "isDone": false,
    "description": "test"
}

$ curl -X GET "http://localhost:3000/v1/tasks/586e886d7106b038d820a550"

{
    "_id": "586e886d7106b038d820a550",
    "updatedAt": "2017-01-05T17:54:53.555Z",
    "createdAt": "2017-01-05T17:54:53.555Z",
    "__v": 0,
    "isDone": false,
    "description": "test"
}

$ curl -X PATCH "http://localhost:3000/v1/tasks/586e886d7106b038d820a550" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'description=amazing'

{
    "_id": "586e886d7106b038d820a550",
    "updatedAt": "2017-01-05T17:56:06.879Z",
    "createdAt": "2017-01-05T17:54:53.555Z",
    "__v": 0,
    "isDone": false,
    "description": "amazing"
}

$ curl -X PATCH "http://localhost:3000/v1/tasks/586e886d7106b038d820a550" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'isDone=true'

{
    "_id": "586e886d7106b038d820a550",
    "updatedAt": "2017-01-05T17:56:24.328Z",
    "createdAt": "2017-01-05T17:54:53.555Z",
    "__v": 0,
    "isDone": true,
    "description": "amazing"
}

$ curl -X PUT "http://localhost:3000/v1/tasks/586e886d7106b038d820a550" \
> -H "Content-Type: application/x-www-form-urlencoded" \
> -d 'isDone=false'

{
    "_id": "586e886d7106b038d820a550",
    "createdAt": "2017-01-05T17:56:40.478Z",
    "updatedAt": "2017-01-05T17:56:40.478Z",
    "isDone": false,
    "description": ""
}

$ curl -X DELETE -i "http://localhost:3000/v1/tasks/586e886d7106b038d820a550"

HTTP/1.1 204 No Content
X-Powered-By: Express
Date: Thu, 05 Jan 2017 17:57:35 GMT
Connection: keep-alive

$ curl -X GET "http://localhost:3000/v1/tasks"

[]
```

If the server stops and starts again the tasks still there, mission accomplished!

_**Note:** I recommend to use [Postman](https://www.getpostman.com/) to test the API instead of cURL._

That all I think. You can [check the code on GitHub](https://github.com/AlbertoFdzM/another-todo-api/tree/post/03).

<!--kg-card-end: markdown-->
