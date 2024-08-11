<template>
  <article>
    <NuxtLink :to="post._path" class="card bg-base-100 shadow-xl sm:card-side">
      <figure class="sm:flex-shrink-0">
        <NuxtImg
          class="w-full aspect-video object-cover max-h-40 sm:aspect-square sm:!max-w-40 sm:max-h-full"
          v-if="post.image"
          :alt="post.image.alt || post.title"
          :src="post.image.src"
        />
        <div
          class="h-4 w-full bg-gradient-to-r from-primary to-accent sm:aspect-square sm:h-full sm:w-40 sm:bg-gradient-to-br"
          v-else
        ></div>
      </figure>
      <div class="card-body py-4">
        <h2 class="card-title">
          {{ post.title }}
        </h2>
        <p>{{ description }}</p>
        <div class="card-actions justify-end">
          <time class="inline-block" :datetime="post.date">
            <FontAwesomeIcon class="mr-1" icon="calendar-day" />
            <span>{{ date }}</span>
          </time>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import type Post from "~/models/Post";

const { post } = defineProps<{
  post: Post;
}>();

let description = post.description;

if (description.length > 160) {
  description = description.substring(0, 157).trim() + "...";
}

const date = post.date ? format(post.date, "yyyy-MM-dd") : "";
</script>

<style></style>
