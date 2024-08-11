<template>
  <PostItem class="[&:not(:last-child)]:mb-4" v-for="post in posts" :post />
</template>

<script lang="ts" setup>
import type Post from "~/models/Post";

defineProps<{
  posts: Post[] | null;
}>();
</script>
