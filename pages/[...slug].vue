<template>
  <ContentWrapper>
    <ContentDoc>
      <template v-slot="{ doc: post }">
        <PostDetail :post />
      </template>

      <template #not-found>
        <div class="prose">
          <h1>Página no encontrada</h1>
        </div>
      </template>

      <template #empty>
        <div class="prose">
          <h1>Página vacía</h1>
        </div>
      </template>
    </ContentDoc>
  </ContentWrapper>
</template>
