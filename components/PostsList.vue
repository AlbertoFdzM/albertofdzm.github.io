<script lang="ts" setup>
defineProps(["posts"]);
</script>

<template>
  <div class="mx-auto max-w-sm sm:max-w-full" v-for="post in posts">
    <PostItem :post />
  </div>
</template>

<style></style>
