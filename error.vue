<template>
  <NuxtLayout>
    <ContentWrapper>
      <div class="prose">
        <h1>{{ error.statusCode }}</h1>
        <p>{{ message }}</p>
        <p class="text-center">
          <NuxtLink class="btn btn-primary" to="/">Volver a inicio</NuxtLink>
        </p>
      </div>
    </ContentWrapper>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

const { error } = defineProps<{
  error: NuxtError;
}>();

let message = "";

switch (error.statusCode) {
  case 404:
    message = "Página no encontrada.";
    break;
  default:
    message = "Hemos tenido un error inesperado.";
}
</script>

<style></style>
