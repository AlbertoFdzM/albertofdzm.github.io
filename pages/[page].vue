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
import type Post from "~/models/Post";

const config = useRuntimeConfig();
const route = useRoute();

const pageSize = config.public.pageSize;
const pageNumber = ref(Number(route.params.page));
const nextPageNumber = computed(() => pageNumber.value + 1);
const previousPageNumber = computed(() => pageNumber.value - 1);
const offset = computed(() => pageSize * (pageNumber.value - 1));

const { data: posts } = await useAsyncData("posts", () => {
  let query = queryContent<Post>()
    .sort({
      date: -1,
    })
    .limit(config.public.pageSize)
    .skip(offset.value);

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: {
        $or: [
          {
            $eq: false,
          },
          {
            $exists: false,
          },
        ],
      },
    });
  }

  return query.find();
});

const { data: totalPosts } = await useAsyncData("totalPosts", () => {
  let query = queryContent();

  if (!config.public.includeDrafts) {
    query = query.where({
      draft: {
        $or: [
          {
            $eq: false,
          },
          {
            $exists: false,
          },
        ],
      },
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
          draft: {
            $or: [
              {
                $eq: false,
              },
              {
                $exists: false,
              },
            ],
          },
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

const totalPages = computed(() =>
  Math.ceil(Number(totalPosts.value) / pageSize)
);
const isSecondPage = computed(() => pageNumber.value === 2);
const isLastPage = computed(() => pageNumber.value >= totalPages.value);
const previousPagePath = isSecondPage ? "/" : `/${previousPageNumber}`;
const nextPagePath = `/${nextPageNumber}`;
</script>
