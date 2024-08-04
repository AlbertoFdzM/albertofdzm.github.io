<template>
  <footer class="footer footer-center text-base-content p-4">
    <div>
      <p class="prose">
        Creado por
        <NuxtLink to="https://linkedin.com/in/albertofdzm"
          >Alberto Fernández</NuxtLink
        >
        con
        <FontAwesomeIcon
          class="text-red-500"
          :icon="faHeart"
          title="amor"
        /><span class="sr-only">amor</span>
        y
        <FontAwesomeIcon
          class="text-blue-500"
          :icon="faCode"
          aria-hidden="true"
          title="código"
        /><span class="sr-only">código</span> usando
        <NuxtLink to="https://nuxt.com/">Nuxt</NuxtLink>.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
