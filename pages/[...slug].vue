<template>
  <ContentDoc v-slot="{ doc: post }">
    <article>
      <h1>{{ post.title }}</h1>
      <ContentRenderer :value="post" />
    </article>
  </ContentDoc>
</template>
