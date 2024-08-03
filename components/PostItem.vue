<script lang="ts" setup>
import {
  faCalendarDay,
  faPersonDigging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps(["post"]);
</script>

<template>
  <article class="mx-auto mb-4">
    <NuxtLink
      class="md group relative block rounded-md bg-gray-800 drop-shadow-xl transition-colors ease-in-out sm:pl-44 sm:pt-2 lg:pl-56"
      :to="post._path"
    >
      <div
        v-if="post.draft"
        class="absolute right-0 top-0 z-10 w-8 rounded-bl-md rounded-tr-md bg-indigo-700 text-center"
        title="Draft post"
      >
        <FontAwesomeIcon :icon="faPersonDigging" />
      </div>
      <header>
        <NuxtImg
          v-if="post.image"
          :alt="post.image.alt || post.title"
          :src="post.image.src"
          class="mb-2 aspect-video max-h-36 w-full rounded-t-md object-cover brightness-50 group-hover:brightness-100 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:h-full sm:max-h-full sm:w-44 sm:rounded-none sm:rounded-l-md lg:w-56"
          width="384"
          height="144"
        />
        <div
          v-else
          class="h-2 w-full rounded-t-md bg-gradient-to-r from-emerald-500 via-emerald-700 to-indigo-800 group-hover:from-emerald-300 group-hover:to-indigo-700 group-focus:from-emerald-300 group-focus:to-indigo-700 sm:absolute sm:left-0 sm:top-0 sm:h-full sm:w-44 sm:rounded-none sm:rounded-l-md sm:bg-gradient-to-br lg:w-56"
        ></div>
        <h2
          class="mb-2 mt-3 px-3 text-lg font-bold text-emerald-500 transition-colors ease-in-out group-hover:text-emerald-200 group-hover:underline group-hover:underline-offset-4 group-focus:text-emerald-200 group-focus:underline group-focus:underline-offset-4 sm:mt-0"
        >
          {{ post.title }}
        </h2>
      </header>
      <div class="px-3 pb-4">
        <p class="mb-2">{{ post.description }}</p>

        <footer class="text-right text-sm leading-none text-slate-400">
          <!-- <div class="inline-block mr-2">
              <CommentCount
                shortname={DISQUS_SHORTNAME}
                config={{
                  identifier: slug,
                  title: title,
                }}
              />
            </div> -->
          <time class="inline-block" :datetime="post.date">
            <FontAwesomeIcon class="mr-1" :icon="faCalendarDay" size="sm" />
            <span>{{ post.date }}</span>
          </time>
        </footer>
      </div>
    </NuxtLink>
  </article>
</template>

<style></style>
