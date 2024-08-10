<template>
  <NuxtLoadingIndicator />
  <div class="min-h-screen flex flex-col">
    <div id="top"></div>
    <Header />
    <main class="mx-auto mt-16 w-full py-4 h-full flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
