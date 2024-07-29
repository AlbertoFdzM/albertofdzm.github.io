<template>
  <NuxtLoadingIndicator />
  <div id="top"></div>
  <header
    className="fixed left-0 top-0 z-10 h-12 w-full bg-gradient-to-br from-slate-800 to-gray-900 shadow-md shadow-black"
  >
    <div className="container mx-auto flex h-full max-w-5xl items-center px-4">
      <h1 className="flex h-full items-center"></h1>
    </div>
  </header>
  <div className="flex min-h-screen flex-col">
    <main
      className="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
    >
      <NuxtPage />
    </main>
  </div>
</template>
