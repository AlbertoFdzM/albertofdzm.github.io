<template>
  <h1>AlbertoFdzM</h1>
  <ContentList v-slot="{ list }">
    <PostsList :posts="list" />
  </ContentList>
</template>
