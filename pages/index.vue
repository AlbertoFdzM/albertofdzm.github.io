<template>
  <ContentWrapper>
    <PostsList :posts />
    <div class="join grid mb-4" v-if="!isLastPage">
      <NuxtLink class="btn" to="/2">Siguiente</NuxtLink>
    </div>
  </ContentWrapper>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const { data: posts } = await useAsyncData("posts", () => {
  let query = queryContent()
    .sort({
      date: -1,
    })
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

let { data: totalPosts } = await useAsyncData("totalPosts", () => {
  let query = queryContent();

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: false,
    });
  }

  return query.count();
});

const pageSize = config.public.pageSize;
const totalPages = Math.ceil(Number(totalPosts.value) / pageSize);
const pageNumber = 1;
const isLastPage = pageNumber >= totalPages;
</script>
