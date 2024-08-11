---
title: Build an App with Electron and TypeScript - Managing Windows and Navigation
description: This article is part of a post series about developing apps with Electron and TypeScript and covers how to handle windows and manage navigation when developing an Electron app.
date: 1970-01-01
lastmod: 2019-12-17
tags:
  - NodeJS
  - TypeScript
  - Electron
draft: true
excerpt: This article is part of a post series about developing apps with Electron and TypeScript and covers how to handle windows and manage navigation when developing an Electron app.
---

<!--kg-card-begin: markdown-->

This article is part of a [post series about developing apps with Electron and TypeScript](https://github.com/AlbertoFdzM/time-tracker) and covers **how to handle windows and manage navigation when developing an Electron app**.

## MacOS windows special cases

### Prevent App to Quit on MacOS

Now when the Electron app starts it opens a window, and when this window is closed, the app quits. This behavior is normal except for MacOS applications, they usually don't quit when their window is closed. To reproduce this functionality the `App` module needs change.

**`/src/App.ts`**

```typescript
// ...

class App {
  //...
  public start(): void {
    // ...

    Electron.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
  }

  // ...

  /**
   * Callback for Electron.App "window-all-closed" event
   * https://electronjs.org/docs/api/app#event-window-all-closed
   *
   * Quits the app unless current operative system is macOS, it doesn't quit apps
   * when all windows are closed
   * https://nodejs.org/docs/latest-v12.x/api/process.html#process_process_platform
   */
  private onWindowAllClosed(): void {
    if (process.platform !== 'darwin') {
      Electron.app.quit();
    }
  }
}
```

Now if the app runs, in a MacOS, it will not quit when its windows are closed unless `Cmd` + `Q` is pressed.

### Reopen Main Window on Activate

When app icon is clicked in the dock, app's main window needs to be reopened if it is closed. To track if the main window is opened it needs to be referenced in a property.

**`/src/App.ts`**

```typescript
// ...

class App {
  private mainWindow: Electron.BrowserWindow | null = null;

  // ...

  private async onReady(): Promise<void> {
    const options: Electron.BrowserWindowConstructorOptions = {
      webPreferences: {
        nodeIntegration: true
      }
    };

    this.mainWindow = new Electron.BrowserWindow(options);

    await this.mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }

  // ...
}
```

By listening to `close` event on the window instance, the reference to the window can be removed.

**`/src/App.ts`**

```typescript
// ...

class App {
  // ...

  private async onReady(): Promise<void> {
    // ...

    this.mainWindow = new Electron.BrowserWindow(options);

    this.mainWindow.on('closed', this.onMainWindowClosed.bind(this));

    await this.mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }

  // ...

  /**
   * Callback for Electron.BrowserWindow "closed" event
   * https://electronjs.org/docs/api/browser-window#event-closed
   *
   * Removes window reference
   */
  private onMainWindowClosed(): void {
    this.mainWindow = null;
  }
}
```

The method `App.onReady` internal logic needs to be moved to a different method so the main window open logic can be called from other private methods.

**`/src/App.ts`**

```typescript
// ...

class App {
  // ...
  private async onReady(): Promise<void> {
    this.openMainWindow();
  }

  // ...


  /**
   * Opens app's main window
   */
  private async openMainWindow(): Promise<void> {
    const options: Electron.BrowserWindowConstructorOptions = {
      webPreferences: {
        nodeIntegration: true
      }
    };

    this.mainWindow = new Electron.BrowserWindow(options);

    this.mainWindow.on('closed', this.onMainWindowClosed.bind(this));

    await this.mainWindow.loadFile(path.join(__dirname, '../index.html'));
  }
}
```

And now the `App.openMainWindow` method can be called from `activated` app event callback to reopen the main window if it is closed.

**`/src/App.ts`**

```typescript
// ...

class App {
  // ...
  public start(): void {
    // ...

    Electron.app.on('activate', this.onActivate.bind(this));
  }

  // ...

  /**
   * Callback for Electron.App "activate" event
   * https://electronjs.org/docs/api/app#event-activate-macos
   *
   * Checks if there is a main window, if not, creates one
   */
  private onActivate(): void {
    if (this.mainWindow === null) {
      this.openMainWindow();
    }
  }
}
```

With this changes applied, next time the app starts, it will be able to close its window and reopen it without quitting when running on MacOS.

<!--kg-card-end: markdown-->

