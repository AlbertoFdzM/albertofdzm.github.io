---
title: Testing an API Against Documentation with Dredd
date: 2017-09-06
lastmod: 2024-08-11
tags:
  - API
  - Apiary
  - NodeJS
  - Dredd
  - ExpressJS
  - API Blueprint
---

<!--kg-card-begin: markdown-->

_**Note:** This is the **5th post** of a series of post about **Building APIs With Express**. Based on my last post about [**Documenting your API with API Blueprint**](/2017/08/documenting-your-api-with-api-blueprint/) I'll continue developing over the [generated code](https://github.com/AlbertoFdzM/another-todo-api/tree/post/04)._

So last time I documented the Another TODO API using [API Blueprint](https://apiblueprint.org/) and now I'm going to take advantage of that to have some **test against the API to ensure documentation is up to date with the actual API code**. For this task, I'm going to be using [Dredd](https://github.com/apiaryio/dredd).

## Dredd

![Dredd Logo](/old-posts-images/2017/08/dredd.png)

Dredd is a tool for testing APIs using their own documentation.

### Installing Dredd Locally

To install Dredd for this use case it is needed to have installed:

- [NodeJS](https://nodejs.org/)
- [NPM](https://npmjs.com)

Then on the terminal:

```bash
npm i -g dredd
```

Now Dredd can be used as CLI tool.

### Configuring Dredd

These Dredd guys are amazing to the point that the only thing needed to be done to start working with Dredd is by running the next line:

```bash
dredd init

? Location of the API description document docs/main.apib
? Command to start API backend server e.g. (bundle exec rails server) npm start
? URL of tested API endpoint http://127.0.0.1:3000/v1
? Programming language of hooks nodejs
? Do you want to use Apiary test inspector? Yes
? Please enter Apiary API key or leave empty for anonymous reporter
? Dredd is best served with Continuous Integration. Create CircleCI config for Dredd? No

Configuration saved to dredd.yml

Run test now, with:

  $ dredd
```

Some notes about what has been done here. Dredd has created a `dredd.yml` file at the root of the project with a bunch of properties based on the replies it has received.

#### `dredd.yml`

```yaml
# https://dredd.readthedocs.io/en/latest/usage-cli.html#configuration-file
dry-run: null
hookfiles: null
language: nodejs
sandbox: false
server: npm start # Command to start the API server
server-wait: 3
init: false
custom:
  apiaryApiKey: ""
names: false
only: []
reporter: apiary
output: []
header: []
sorted: false
user: null
inline-errors: false
details: false
method: []
color: true
level: info
timestamp: false
silent: false
path: []
hooks-worker-timeout: 5000
hooks-worker-connect-timeout: 1500
hooks-worker-connect-retry: 500
hooks-worker-after-connect-wait: 100
hooks-worker-term-timeout: 5000
hooks-worker-term-retry: 500
hooks-worker-handler-host: 127.0.0.1
hooks-worker-handler-port: 61321
config: ./dredd.yml # Source of Dredd config file
blueprint: docs/main.apib # The API Blueprint file to get API definitions
endpoint: "http://127.0.0.1:3000/v1" # The base URL where the test will run
```

I've commented the one that I found most important for this step but all the info can be found at [Dredd Configuration File Documentation](https://dredd.readthedocs.io/en/latest/usage-cli.html#configuration-file).

### Running Tests with Dredd

Now that the project has a config file and Dredd knows how to run the server this is the next command to execute (I think you already know):

```bash
dredd
```

When executing the tests there will appear a report about what Dredd has found:

```bash
info: Configuration './dredd.yml' found, ignoring other arguments.
warn: Apiary API Key or API Project Subdomain were not provided. Configure Dredd to be able to save test reports alongside your Apiary API project: https://dredd.readthedocs.io/en/latest/how-to-guides/#using-apiary-reporter-and-apiary-tests
info: Starting backend server process with command: npm start
info: Waiting 3 seconds for backend server process to start

...

info: Beginning Dredd testing...
GET /v1/tasks 200 13.427 ms - 1450
fail: GET (200) /tasks duration: 58ms

...

info: Displaying failed tests...
fail: GET (200) /tasks duration: 58ms
fail: headers: Header 'content-type' has value 'application/json; charset=utf-8' instead of 'application/json'

request:
method: GET
uri: /tasks
headers:
    User-Agent: Dredd/4.4.0 (Windows_NT 10.0.15063; x64)
    Content-Length: 0

body:



expected:
headers:
    Content-Type: application/json

body:
[
  {
    "__v": 0,
    "updatedAt": "2017-01-05T17:53:37.066Z",
    "createdAt": "2017-01-05T17:53:37.066Z",
    "_id": "586e88217106b038d820a54e",
    "isDone": false,
    "description": "test"
  },
  ...
]
statusCode: 200


actual:
statusCode: 200
headers:
    x-powered-by: Express
    content-type: application/json; charset=utf-8
    content-length: 1450
    etag: W/"5aa-Oh/N4fD/Is1M3QO9MzB/QQaYxDU"
    date: Fri, 01 Sep 2017 15:36:43 GMT
    connection: close

body:
[{"_id":"59a2fe039c2adf0e90acca12","updatedAt":"2017-08-27T17:14:43.564Z","createdAt":"2017-08-27T17:14:43.564Z","__v":0,"isDone":false,"description":"Buy milk"},{"_id":"59a2fe0f852c331148011df3","updatedAt":"2017-0
8-27T17:14:55.731Z",...
}]

...

complete: 0 passing, 6 failing, 0 errors, 0 skipped, 6 total
complete: Tests took 815ms
DELETE /v1/tasks/586e88337106b038d820a54f 404 1.128 ms - 539
complete: See results in Apiary at: https://app.apiary.io/public/tests/run/423b37ad-1dd8-499c-9124-4320ea0f7911
info: Backend server process exited
```

Also, at the end, if the dredd config file has the `reporter` as `apiary`, there will be a link (similar to `https://app.apiary.io/public/tests/run/123456`) to this page:

![Apiary Dredd Test](/old-posts-images/2017/08/Apiary_Dredd_Test.PNG)\
_**Note:** The provided link is a temporary page and will be removed after a while._

In this panel is a lot of info about how the tests did go. Another TODO API has some errors in the docs, one of them is the definition of `content-type`. [Let's fix that](https://github.com/AlbertoFdzM/another-todo-api/commit/0e4663f45b0e064b6cd8573acda77d6d4b1f270b) and run the tests again.

After the changes and running `dredd` this is the new report:

![Apiary Dredd Test](/old-posts-images/2017/08/Apiary_Dredd_Test_1.PNG)

This time some of the endpoints have been validated but not all. The **endpoints that require a task ID to work are returning `404` responses and causing the test to fail**. this is because the task IDs specified in the API docs are only exposed as an example and doesn't really exists in the DB. Here is when [Dredd hooks](https://dredd.readthedocs.io/en/latest/hooks-nodejs.html) come handy.

### Dredd Hooks

The hooks allow executing some code between, before or after each test case. This time I'm going to use one hook to get the ID of the task created on the "Create a New Task" definition to use that created task for the tests that need a _taskId_ to work.

#### `docs/hooks.js`

```javascript
// Import the hooks library to work with them (injected by dredd)
const hooks = require("hooks");
// Create some shorthand functions for the hooks
const after = hooks.after;
const before = hooks.before;

// Because the action is going to be the same in all the hooks lets create a function
const replaceUrlForCreatedTaskId = function (transaction) {
  // Gets the taskId from the response object
  let taskId = JSON.parse(
    responseStash["Tasks > Tasks Collection > Create a New Task"].body
  )._id;
  // Gets the predefined request url
  let url = transaction.fullPath;

  // Replaces the wrong taskId with the correct one
  transaction.fullPath = url.replace("586e88337106b038d820a54f", taskId);
};

// Instantiates an object to store the responses
let responseStash = {};

// Sets a hook to be executed after creating a task to store the response
after("Tasks > Tasks Collection > Create a New Task", function (transaction) {
  // Stores the response inside the temporary object
  responseStash[transaction.name] = transaction.real;
});

// Sets hooks before the requests are made to replace the URLs
before("Tasks > Task > View a Task", replaceUrlForCreatedTaskId);
before("Tasks > Task > Edit a whole Task", replaceUrlForCreatedTaskId);
before("Tasks > Task > Edit a Task partially", replaceUrlForCreatedTaskId);
before("Tasks > Task > Delete a Task", replaceUrlForCreatedTaskId);
```

After setting the hooks the `dredd.yml` file needs to be modified.

#### `dredd.yml`

```yaml
# https://dredd.readthedocs.io/en/latest/usage-cli.html#configuration-file
dry-run: null
hookfiles: ./docs/hooks.js # Here, we are telling dredd where are the hooks files
language: nodejs
sandbox: false
```

Now running the tests again:

```bash
info: Displaying failed tests...
fail: PATCH (200) /tasks/586e88337106b038d820a54f duration: 11ms
fail: body: Can't validate. Expected body Content-Type is application/json; charset=utf-8 but body is not a parseable JSON: Parse error on line 1:
+ Attributes (Task)
^
Expecting 'STRING', 'NUMBER', 'NULL', 'TRUE', 'FALSE', '{', '[', got 'undefined'
```

It is complaining about the line 118 of the `main.apib` file:

```markdown
- Response 200 (application/json; charset=utf-8)

        + Attributes (Task)
```

There is being used a _data structure_ for the response field but it's indented by 8 spaces , and for API Blueprint documents that means a block of code, so by [reducing it to 4](https://github.com/AlbertoFdzM/another-todo-api/commit/dd6a4b1f0f61aa18a98bbc27f907cc39e8ad5b9d) and running the tests again:

```bash
info: Beginning Dredd testing...
info: Found Hookfiles: 0=E:\develop\another-todo-api\docs\hooks.js
GET /v1/tasks 200 14.604 ms - 5636
pass: GET (200) /tasks duration: 69ms
POST /v1/tasks 201 26.640 ms - 160
pass: POST (201) /tasks duration: 48ms
GET /v1/tasks/59a9a413bfa907076857eae2 200 4.018 ms - 160
pass: GET (200) /tasks/586e88337106b038d820a54f duration: 110ms
PUT /v1/tasks/59a9a413bfa907076857eae2 200 7.289 ms - 159
pass: PUT (200) /tasks/586e88337106b038d820a54f duration: 21ms
pass: PATCH (200) /tasks/586e88337106b038d820a54f duration: 15ms
PATCH /v1/tasks/59a9a413bfa907076857eae2 200 2.659 ms - 164
pass: DELETE (204) /tasks/586e88337106b038d820a54f duration: 30ms
complete: 6 passing, 0 failing, 0 errors, 0 skipped, 6 total
complete: Tests took 579ms
DELETE /v1/tasks/59a9a413bfa907076857eae2 204 3.519 ms - -
complete: See results in Apiary at: https://app.apiary.io/public/tests/run/ca648983-2438-4b7b-b720-352bc00a79c8
info: Backend server process exited
```

_Smooth like butter_

![Clean Dredd Test Report](/old-posts-images/2017/09/Apiary_Dredd_Test_OK.PNG)

### NPM Test Script

Until now I've been using Dredd from my global installation but it's a better idea to include it as a dev dependency and create an npm test script.

```bash
npm i -D dredd
```

#### `package.json`

```json
...
  "scripts": {
    "lint": "eslint **/*.js",
    "start": "set DEBUG=another-todo:* && node bin/www",
    "test": "dredd"
  },
...
```

## Conclusion

Dredd is a good tool to **maintain your API Doc updated and make [DDD (Documentation Driven Development)](https://gist.github.com/zsup/9434452)**.

Anyway, you can check the [generated code on GitHub](https://github.com/AlbertoFdzM/another-todo-api/tree/post/05).

Happy coding :heart:!

<!--kg-card-end: markdown-->
