<script setup lang="ts">
const config = useRuntimeConfig();
const { data: posts } = await useAsyncData("posts", () => {
  let query = queryContent().only([
    "date",
    "description",
    "draft",
    "_draft",
    "_id",
    "lastmod",
    "_locale",
    "_path",
    "title",
    "image",
  ]);

  if (!config.includeDrafts) {
    query = query.where({
      draft: false,
    });
  }

  return query.find();
});
</script>

<template>
  <h1>AlbertoFdzM</h1>
  <PostsList :posts />
</template>
