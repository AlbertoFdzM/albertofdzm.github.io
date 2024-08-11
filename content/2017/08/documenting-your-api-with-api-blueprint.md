---
title: Documenting your API with API Blueprint
date: 2017-08-25
lastmod: 2017-11-20
tags:
  - ExpressJS
  - NodeJS
  - API
  - JavaScript
  - API Blueprint
  - Apiary
---

<!--kg-card-begin: markdown-->

This article covers **how to document an API REST using API Blueprint** standard providing API usage info to future clients. It can also be helpful to design the structure of future API endpoints before start its development.

_**Note:** This is the 4th post of a series of post about **Building APIs With Express**. Based on my last post about [**Mongoose, MongoDB and Express**](/2017/01/mongoose-mongodb-and-express/) I'll continue developing over the [generated code](https://github.com/AlbertoFdzM/another-todo-api/tree/post/03)._

OMG, a lot of time has passed since my last commit and now when I look at the API there are some endpoints that I don't remember very well since the last time I developed them. Let's fix it now that I understand most of it by **documenting the API using [API Blueprint syntax](https://apiblueprint.org/)**.

API Blueprint is a very basic standard based on **[MSON (Markdown Syntax for Object Notation)](https://apiblueprint.org/documentation/mson/tutorial.html)** and due to its relative simplicity to write it, it could be easily maintainable along the life of an API.

## Documenting right

I'm going to create a new folder in my project called `docs` to store all the documentation about my TODO API, and "_why is this? in the same repo as your code?_" may you ask, well this is because I think **the docs files should be as close as possible to your code** to ensure that they are updated and maintained by whom is developing the API. Also because I could use them to **test the API against the documentation** using some nice tools.

Let's stop chattering and start coding!

## Defining the API

First I'm going to define the API main info:

### `/docs/main.md`

```markdown
FORMAT: 1A

# Another TODO

Another TODO API is that, another TODO API.
```

In the first line, I'm setting the format used for the document and the name for my API and a small description. That was easy, time to define the API resources after the API general description.

#### API Resources

```markdown
FORMAT: 1A

...

# Group Tasks

Resources related to the tasks in the API.

## Tasks Collection [/tasks]
```

_**Note:** Mind the ellipsis `...` as obviate code._

Now here are a couple of **keywords that will define our API schema**, the first one is `Group` that is defining a section to categorize some resource and the other one is the `[/tasks]` definition at the end of the second header that is defining and endpoint. Now the actions.

#### Actions

```markdown
...

### List All Tasks [GET]

- Response 200 (application/json)

        [
          {
            "__v": 0,
            "updatedAt": "2017-04-09T16:15:37.066Z",
            "createdAt": "2017-04-09T16:15:37.066Z",
            "_id": "586e88217106b038d820a54e",
            "isDone": false,
            "description": "test"
          },
          {
            "__v": 0,
            "updatedAt": "2017-04-09T16:15:37.067Z",
            "createdAt": "2017-04-09T16:15:37.067Z",
            "_id": "586e88337106b038d820a54f",
            "isDone": false,
            "description": "test"
          }
        ]
```

A lot of stuff happening on this lines, first there is a keyword in the header `[GET]` indicating the verb of the request and after that it's a **response definition** (they must start with `+`, `*` or `-`, like a markdown list item) followed by the status code `200` (mandatory) and the response `Content-Type` `application/json` (optional), and at the end an example of response body (example objects must be indented with 8 spaces or 2 tabs).

What about the `POST`?

```markdown
...

### Create a New Task [POST]

- Attributes

  - description: `Buy milk` (string) - Task description
  - isDone: false (boolean, required) - Done status

- Request (application/json)

        {
          "description": "Buy milk",
          "isDone": false
        }

- Response 201 (application/json)

        {
          "__v": 0,
          "updatedAt": "2017-04-09T16:30:42.010Z",
          "createdAt": "2017-04-09T16:30:42.010Z",
          "_id": "586e88337106b038d820a54f",
          "isDone": false,
          "description": "Buy milk"
        }
```

Very similar to the `GET` one but this time I've also specified the `Request` and `Attributes` definition.

In `Attributes` there is a list of items that represent the possible properties for the request body each one with the prop name, an example value, the type, if is required and a small description.

In `Request` I've defined an example of a request body object.

Time to deal with URI params

#### URI Params

For the resources that have to be accessed by attacking an URL with params (`/tasks/:id` in my case) there is a way to define them:

```markdown
## Task [/tasks/{taskId}]

- Parameters

  - taskId: `586e88337106b038d820a54f` (string)

### View a Task [GET]

- Response 200 (application/json)

        {
          "__v": 0,
          "updatedAt": "2017-04-09T16:30:42.010Z",
          "createdAt": "2017-04-09T16:30:42.010Z",
          "_id": "586e88337106b038d820a54f",
          "isDone": false,
          "description": "Buy milk"
        }
```

The properties defined in the URL with braces like `{taskId}` will be related to the definitions with the same name in the `Parameters` section. The `Parameters` section uses the same nomenclature as `Attributes`.

#### Data Structures

It is a bit of a harsh to define in each section the same response so you can define a `Data Structures` section in your docs to store some basic data structures.

```markdown
## Data Structures

### Task

- \_id: `586e88337106b038d820a54f` (string, required) - Task's ID
- description: `Buy more milk` (string, required) - Task's description
- isDone: false (boolean, required) - Done status
- createdAt: `2017-04-09T16:30:42.010Z` (string, required) - Task's created date
- updatedAt: `2017-04-09T16:30:42.010Z` (string, required) - Task's update date
```

And then reuse them on your endpoint definitions.

```markdown
### Edit a Task partially [PATCH]

- Attributes

  - description: `Buy more milk` (string) - Task description
  - isDone: true (boolean) - Done status

- Request (application/json)

        {
          "description": "Buy more milk"
        }

- Response 200 (application/json)

        + Attributes (Task)
```

Here in the `Response` definition, I have used my `Attributes` data structure.

## That's it!

I think I've covered all the basic cases by now, you can read this [Advanced Tutorial about API Blueprint](https://apiblueprint.org/documentation/advanced-tutorial.html) and define a much more robust API.

As always you can [check the code on GitHub](https://github.com/AlbertoFdzM/another-todo-api/tree/post/04) and you can review the [Another TODO API docs in Apiary](http://docs.anothertodo.apiary.io/)

<!--kg-card-end: markdown-->
