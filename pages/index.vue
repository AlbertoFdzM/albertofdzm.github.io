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
    <!-- <div class="join grid grid-cols-2 mb-4">
      <button class="join-item btn" disabled>Anterior</button>
      <button class="join-item btn">Siguiente</button>
    </div> -->
  </div>
</template>
