<template>
  <header
    class="fixed left-0 top-0 z-10 w-full transition-transform"
    :class="{ '-translate-y-full': isHidden }"
  >
    <nav class="navbar bg-base-100 shadow-md shadow-black">
      <div class="navbar-start">
        <NuxtLink class="btn btn-ghost text-xl text-primary" to="/"
          ><h1>Only The Pixel</h1></NuxtLink
        >
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const isHidden = ref(false);

if (import.meta.browser) {
  let lastScrollPosition = window.scrollY;

  function handleScroll() {
    requestAnimationFrame(() => {
      const newScrollPosition = window.scrollY;

      const isScrollingDown = lastScrollPosition < newScrollPosition;

      if (isScrollingDown && !isHidden.value) {
        isHidden.value = true;
      } else if (!isScrollingDown && isHidden.value) {
        isHidden.value = false;
      }

      lastScrollPosition = newScrollPosition;
    });
  }

  onMounted(() => window.addEventListener("scroll", handleScroll));
  onUnmounted(() => window.removeEventListener("scroll", handleScroll));
}
</script>

<style></style>
