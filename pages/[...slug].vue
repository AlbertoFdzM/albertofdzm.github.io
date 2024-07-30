<template>
  <ContentDoc>
    <template v-slot="{ doc: post }">
      <article>
        <h1>{{ post.title }}</h1>
        <ContentRenderer :value="post" />
      </article>
    </template>

    <template #not-found>
      <h1>Página no encontrada</h1>
    </template>
  </ContentDoc>
</template>
