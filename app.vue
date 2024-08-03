<template>
  <NuxtLoadingIndicator />
  <div id="top"></div>
  <header class="fixed left-0 top-0 z-10 w-full">
    <nav class="navbar bg-base-100 shadow-md shadow-black">
      <div class="navbar-start">
        <NuxtLink class="btn btn-ghost text-xl text-primary" to="/"
          ><h1>AlbertoFdzM</h1></NuxtLink
        >
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
