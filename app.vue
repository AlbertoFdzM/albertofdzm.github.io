<template>
  <NuxtLoadingIndicator />
  <div id="top"></div>
  <header class="fixed left-0 top-0 z-10 h-12 w-full">
    <nav
      class="navbar bg-gradient-to-br from-slate-800 to-gray-900 shadow-md shadow-black w-full"
    >
      <div class="container mx-auto flex h-full max-w-5xl items-center px-4">
        <h1 class="flex h-full items-center">
          <NuxtLink to="/">AlbertoFdzM</NuxtLink>
        </h1>
      </div>
    </nav>
  </header>
  <div class="flex min-h-screen flex-col">
    <main
      class="mx-auto mt-16 w-full px-5 pt-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
    >
      <NuxtPage />
    </main>
  </div>
</template>
