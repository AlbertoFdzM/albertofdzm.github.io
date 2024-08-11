<template>
  <article class="prose">
    <NuxtImg class="rounded-md" :src="post.image?.src" />
    <h1>{{ post.title }}</h1>
    <ContentRenderer :value="post" />
  </article>
</template>

<script lang="ts" setup>
defineProps<{
  post: {
    title: string;
    image?: {
      src: string;
      alt?: string;
    };
  };
}>();
</script>

<style></style>
