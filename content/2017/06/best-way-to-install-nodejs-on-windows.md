---
title: Best Way to Install NodeJS on Windows
date: 2017-06-04
lastmod: 2024-08-11
tags:
  - NodeJS
  - Windows
---

I agree that working with a Mac is the best thing to develop in NodeJS these days without having any headache but here is my excuse to use Windows. I'm a gamer, and as a gamer, I use Windows to being able to play anything, but I also like to develop toy project in my free time or contribute to the open source cause, so I need a correct environment to work with.

### NVM

When I use Node at work I use it by installing it with [NVM](https://github.com/creationix/nvm). If you don't know what I'm talking about let me explain it to you. NVM (Node Version Manager) is a utility to manage multiple NodeJS versions within the same machine avoiding problems between installations like packages compatibilities or wrong installations.

The bad news is that this project is only developed for Mac. But hold on because there's another side project made with Go that does the same, [nvm-windows](https://github.com/coreybutler/nvm-windows). You can grab the installer from the page of the link.

_**Important Note:** Pay attention to what the nvm-windows documentation says:_

> It comes with an installer (and uninstaller) because getting it should be easy. Please note, you need to uninstall any existing versions of node.js before installing NVM for Windows. Also delete any existing nodejs installation directories (e.g., "C:\Program Files\nodejs") that might remain.
>
> NVM's generated symlink will not overwrite an existing (even empty) installation directory. You should also delete the existing npm install location (e.g. "C:\Users\&lt;user>\AppData\Roaming\npm") so that the nvm install location will be correctly used instead.

### Getting Started

Once you get this pearl installed on your machine you can start rolling by checking if you have it correctly installed running the next command in your terminal:

```bash
nvm version
1.1.5
```

It should return you the nvm version you are using. Now let's check if we have some node version installed:

```bash
nvm list

No installations recognized.
```

As expected, nothing yet so let's install NodeJS v8:

```bash
nvm install 8

Downloading node.js version 8.0.0 (64-bit)...
Complete

...

Installation complete. If you want to use this version, type

nvm use 8.0.0
```

So now you can run what it says:

```bash
nvm use 8
8.0.0
Now using node v8.0.0 (64-bit)
```

Aaaand check your node version of course:

```bash
node -v
v8.0.0
```

Show now whenever you install npm packages they will be installed under that version and if you change version the packages will not be moved to the new one to avoid incompatibility problems so you will have to install them manually again (nvm for Mac does have a command for this `nvm install 8 --reinstall-packages-from=<oldVersion>`).

And that's it, a small post for a huge tool!
