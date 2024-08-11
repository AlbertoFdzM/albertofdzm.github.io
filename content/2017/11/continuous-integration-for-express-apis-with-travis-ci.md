---
title: Continuous Integration for Express APIs with Travis CI
date: 2017-11-15
lastmod: 2024-08-11
tags:
  - NodeJS
  - API
  - ExpressJS
  - TravisCI
---

<!--kg-card-begin: markdown-->

This article cover **how to use Travis CI service with NodeJS** for an open source project hosted on GitHub. At the end, you would be able to setup a basic build pipeline to automatically validate your code using **Continuous Integration (CI)**.

_**Note:** This is the **6th post** of a series about **Building APIs With Express**. The code of this post will be developed over the [generated code](https://github.com/AlbertoFdzM/another-todo-api/tree/post/05) of the last post ([**Testing an API Against Documentation**](/2017/09/testing-an-api-against-documentation/))._

## Travis CI

[Travis CI](https://travis-ci.com/) is one of the most used [Continuous Integration](https://en.wikipedia.org/wiki/Continuous_integration) services in the open source community. It's ridiculous how easy is to enable it for a GitHub project. To activate it first I need to [have an account in travis-ci.org](https://travis-ci.org/auth) and give it access to GitHub projects, then in the [Travis CI profile page](https://travis-ci.org/profile/) activate the service for the project.

![Travis CI Service Activation](/old-posts-images/2017/11/travis-ci-service-activation.PNG)

And that's all I need, thanks for the reading! Ah... ok, maybe there is needed something more...

![Travis CI without builds](/old-posts-images/2017/11/travis-ci-no-builds.PNG)

Ok, to start building things with Travis I have to update the code. Once Travis **detects some new branch or commits** on the repo it **will run a build with that code**, but at this point, it will fail.

## Setup Travis CI for NodeJS

Yes, there is a little thing to do before Travis starts working smoothly. It doesn't know what to do with that GitHub repository, to help in this, the repo has to have a **config file (`.travis.yml`) that tells Travis what to do with the code**. If it doesn't find this file it will try to build the project using Ruby.

### `.travis.yml`

```yaml
language: node_js # Sets which engine use to build the project
node_js: "node" # Specifies node version to use "node"="latest"
```

This is the simplest Travis CI config file for start building in NodeJS.

_**Note:** More info about the configs on the [docs for Travis with JavaScript](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)._

### First build

After committing this file and uploading it to GitHub, Travis will start a new build, in this case with the next logs:

```bash
Worker information
hostname: b4baa4ff-edbd-48aa-b09f-bc84b287b798@1.i-0a50124-production-2-worker-org-ec2.travisci.net
version: v3.4.0 https://github.com/travis-ci/worker/tree/ce0440bc30c289a49a9b0c21e4e1e6f7d7825101
instance: 7917cbf travisci/ci-garnet:packer-1503972846 (via amqp)
startup: 571.280161ms
Build system information
Build language: node_js

...

MongoDB version
MongoDB 3.2.16

...

$ git clone --depth=50 --branch=post/06 https://github.com/AlbertoFdzM/another-todo-api.git AlbertoFdzM/another-todo-api
Cloning into 'AlbertoFdzM/another-todo-api'...
remote: Counting objects: 124, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 124 (delta 0), reused 2 (delta 0), pack-reused 121
Receiving objects: 100% (124/124), 79.47 KiB | 15.89 MiB/s, done.
Resolving deltas: 100% (54/54), done.

$ cd AlbertoFdzM/another-todo-api
$ git checkout -qf dac5b5b13eef6d36ec76538c8194ce32923d628a
$ export PATH=./node_modules/.bin:$PATH
Updating nvm
$ nvm install node
Downloading and installing node v9.1.0...
Downloading https://nodejs.org/dist/v9.1.0/node-v9.1.0-linux-x64.tar.xz...
######################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v9.1.0 (npm v5.5.1)

$ node --version
v9.1.0
$ npm --version
5.5.1
$ nvm --version
0.33.6
$ yarn
yarn install v0.27.5
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in 131.09s.

$ npm test

> another-todo-api@0.0.0 test /home/travis/build/AlbertoFdzM/another-todo-api
> dredd

info: Configuration './dredd.yml' found, ignoring other arguments.
warn: Apiary API Key or API Project Subdomain were not provided. Configure Dredd to be able to save test reports alongside your Apiary API project: https://dredd.readthedocs.io/en/latest/how-to-guides/#using-apiary-reporter-and-apiary-tests
info: Starting backend server process with command: npm start
info: Waiting 3 seconds for backend server process to start

> another-todo-api@0.0.0 start /home/travis/build/AlbertoFdzM/another-todo-api
> set DEBUG=another-todo:* && node bin/www

(node:4653) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]
info: Beginning Dredd testing...
info: Found Hookfiles: 0=/home/travis/build/AlbertoFdzM/another-todo-api/docs/hooks.js
error: GET (200) /tasks duration: 120101ms
error: Error connecting to server under test!
GET /v1/tasks - - ms - -
error: POST (201) /tasks duration: 120105ms
error: Error connecting to server under test!
error: GET (200) /tasks/586e88337106b038d820a54f duration: NaNms
error: TypeError: Cannot read property 'body' of undefined
    at replaceUrlForCreatedTaskId (/home/travis/build/AlbertoFdzM/another-todo-api/docs/hooks.js:10:89)

...

complete: 0 passing, 0 failing, 10 errors, 0 skipped, 6 total
complete: Tests took 720719ms
complete: See results in Apiary at: https://app.apiary.io/public/tests/run/91a01c82-f849-4736-8681-469d8e4d7ba9
info: Backend server process exited
npm ERR! Test failed.  See above for more details.
The command "npm test" exited with 1.
Done. Your build exited with 1.
```

_**Note:** Some logs traces have been omitted to improve readability. The whole log can be found in the [Travis CI build report](https://travis-ci.org/AlbertoFdzM/another-todo-api/builds/302110299)._

### What has happened?

There are some good things and some bad thing to pay attention to. The first one is that Travis has made a build with NodeJS! It gives a lot of info about what is happening in that machine that is building the project in "the cloud" (OS version, node version, npm version, what things are installed in the system..)

1. Clone the repo: `git clone --depth=50 --branch=post/06 https://github.com/AlbertoFdzM/another-todo-api.git AlbertoFdzM/another-todo-api`
2. Install NodeJS: `nvm install node`
3. Install project dependencies: `yarn` (it detects that we have a `yarn.lock` file in the project)
4. Execute the tests: `npm test` (**default build command for Travis on NodeJS**)
5. The tests fail: `npm ERR! Test failed. See above for more details.` :cry:
6. The build fails: `Done. Your build exited with 1.` (hint: 1 is bad, 0 is good)

The problem:

```bash
(node:4653) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): MongoError: failed to connect to server [localhost:27017] on first connect [MongoError: connect ECONNREFUSED 127.0.0.1:27017]
```

It hasn't connected to the MongoDB database even though MongoDB was installed in the system:

```bash
MongoDB version
MongoDB 3.2.16
```

This is because [Travis doesn't start the service unless you tell it to do so](https://docs.travis-ci.com/user/database-setup/).

Let's fix it.

### `.travis.yml`

```yml
language: node_js
node_js: "node"
services: mongodb
```

Commit, push, [check the build](https://travis-ci.org/AlbertoFdzM/another-todo-api/builds/302132559) and... :tada: `Done. Your build exited with 0.` (reminder: 0 is good)

Stop the machines, we can go home finally.

## Wait... This post for a file with 3 lines only?

Yep, but there was already some things done, like well-defined dependencies in the `package.json` and tests defined using NodeJS standard practices with `npm test`.

Want more? Ok, there is more to do.

### Travis CI Caching

The Travis config file can define which folders should be cached to improve build time. In this case, I'm going to cache the `node_modules` folder to reduce the time installing dependencies and also for `yarn`.

#### `.travis.yml`

```yaml
language: node_js
node_js: "node"
services: mongodb
cache:
  directories:
    - "node_modules"
  yarn: true
```

_**Note:** More info in [Travis CI Caching documentation](https://docs.travis-ci.com/user/caching)._

### Travis Build Over Multiple NodeJS Versions

Travis CI can be configured to run against multiple NodeJS versions every time it builds to ensure the project works correctly in this environments.

For this project, it will run builds for the "latest" version, for NodeJS v4.x and NodeJS v7.x.

#### `.travis.yml`

```yaml
language: node_js
node_js:
  - "node"
  - "7"
  - "4"
services: mongodb
cache:
  directories:
    - "node_modules"
  yarn: true
```

### THE Travis Status Badge

[![Build Status](https://travis-ci.org/AlbertoFdzM/another-todo-api.svg?branch=master)](https://travis-ci.org/AlbertoFdzM/another-todo-api)

This is the only very thing why all of us integrate our projects with Travis. To be the fanciest on GitHub wearing a bunch of blue/green badges saying that everything is ok and all is up to date.

To get the code click on the badge from the Travis CI page of the project, a dialog will appear showing you different options about which branch and in what kind of code you want the image snippet.

That image will show the updated build status of the selected branch.

#### `README.md`

```markdown
# Another boring TODO API

[![Build Status](https://travis-ci.org/AlbertoFdzM/another-todo-api.svg?branch=master)](https://travis-ci.org/AlbertoFdzM/another-todo-api)

...
```

### GitHub Code Supervision with Travis CI

Another cool thing Travis can do is to check every bit of code that changes in the project and avoid breaking changes to be merged into critical branches as well as notify about commits breaking the build.

Checking the [commits history](https://github.com/AlbertoFdzM/another-todo-api/commits/post/06) with Travis integrated, there appears checks and crosses indicating if the build executed for that commit went ok, and by clicking them you can go to the Travis build logs.

![GitHub Commits With Travis CI Status](/old-posts-images/2017/11/github-commits-with-travis-status.PNG)

To avoid direct commits against a branch in GitHub and instead add code to it by Pull Requests you can activate the Branch Protection under the Project Settings inside the Branches section. Once there select the branch to protect and check "Protect this branch", "Require status checks to pass before merging", "Require branches to be up to date before merging", "continuous-integration/travis-ci" and "Include administrators".

![GitHub Branch Protection](/old-posts-images/2017/11/github-branch-protection.PNG)

By this way, all the code to be modified in that branch has to pass through a PR and then complete a successful build with Travis.

![Travis CI PR Check](/old-posts-images/2017/11/travis-ci-pr-check.PNG)

## Conclusion

Travis CI is perfect to ensure the sanity of your code and to maintain good practices against the project, it also helps to detect possible bugs caused by refactors or changes in the functionality of the project. But that's not all, with advanced builds you could make deploys to production servers or build a compiled version for the end-user.

As always, the [generated code from this article is on GitHub](https://github.com/AlbertoFdzM/another-todo-api/tree/post/06).

<!--kg-card-end: markdown-->
