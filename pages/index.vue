<template>
  <ContentWrapper>
    <PostsList :posts />
    <div class="join grid mb-4" v-if="!isLastPage">
      <NuxtLink class="btn" to="/2">Siguiente</NuxtLink>
    </div>
  </ContentWrapper>
</template>

<script setup lang="ts">
import type Post from "~/models/Post";

const config = useRuntimeConfig();

const postsAsyncData = await useAsyncData("posts", () => {
  let query = queryContent<Post>()
    .sort({
      date: -1,
    })
    .limit(config.public.pageSize);

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

const posts = postsAsyncData.data.value || [];

let { data: totalPosts } = await useAsyncData("totalPosts", () => {
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

const pageSize = config.public.pageSize;
const totalPages = Math.ceil(Number(totalPosts.value) / pageSize);
const pageNumber = 1;
const isLastPage = pageNumber >= totalPages;
</script>
