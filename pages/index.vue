<script setup lang="ts">
const config = useRuntimeConfig();
const { data: posts } = await useAsyncData("posts", () => {
  let query = queryContent()
    .only([
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
    ])
    .limit(config.public.pageSize);

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: false,
    });
  }

  return query.find();
});
</script>

<template>
  <div class="mx-auto max-w-md px-4 sm:max-w-xl">
    <PostsList :posts />
    <div class="join grid mb-4">
      <NuxtLink class="btn" to="/2">Siguiente</NuxtLink>
    </div>
  </div>
</template>
