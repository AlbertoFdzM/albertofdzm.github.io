<template>
  <ContentWrapper>
    <PostsList :posts />
    <div class="join grid mb-4" v-if="isLastPage">
      <NuxtLink class="btn" :to="previousPagePath">Anterior</NuxtLink>
    </div>
    <div class="join grid grid-cols-2 mb-4" v-else>
      <NuxtLink class="join-item btn" :to="previousPagePath">Anterior</NuxtLink>
      <NuxtLink class="join-item btn" :to="nextPagePath">Siguiente</NuxtLink>
    </div>
  </ContentWrapper>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const pageSize = config.public.pageSize;
const pageNumber = Number(route.params.page);
const nextPageNumber = pageNumber + 1;
const previousPageNumber = pageNumber - 1;
const offset = pageSize * (pageNumber - 1);

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
    .limit(config.public.pageSize)
    .skip(offset);

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: false,
    });
  }

  return query.find();
});

const { data: totalPosts } = await useAsyncData("totalPosts", () => {
  let query = queryContent();

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: false,
    });
  }

  return query.count();
});

definePageMeta({
  validate: async (route) => {
    const config = useRuntimeConfig();

    const pageSize = config.public.pageSize;

    const { data: totalPosts } = await useAsyncData("totalPosts", () => {
      let query = queryContent();

      if (!config.public.includeDrafts) {
        query = query.where({
          draft: false,
        });
      }

      return query.count();
    });

    const totalPages = Math.ceil(Number(totalPosts.value) / pageSize);

    return (
      typeof route.params.page === "string" &&
      Number(route.params.page) <= totalPages
    );
  },
});

const totalPages = Math.ceil(Number(totalPosts.value) / pageSize);
const isSecondPage = pageNumber === 2;
const isLastPage = pageNumber >= totalPages;
const previousPagePath = isSecondPage ? "/" : `/${previousPageNumber}`;
const nextPagePath = `/${nextPageNumber}`;
</script>
