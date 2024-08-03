<template>
  <ContentDoc>
    <template v-slot="{ doc: post }">
      <article class="prose mx-auto max-w-sm sm:max-w-full">
        <h1>{{ post.title }}</h1>
        <ContentRenderer :value="post" />
      </article>
    </template>

    <template #not-found>
      <h1>Página no encontrada</h1>
    </template>

    <template #empty>
      <h1>Página vacía</h1>
    </template>
  </ContentDoc>
</template>
