<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen flex flex-col">
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
    <main class="mx-auto mt-16 w-full py-4 h-full flex-grow">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
