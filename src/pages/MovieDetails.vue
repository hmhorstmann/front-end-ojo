<template>
  <div>Chars - {{ $route.params.id }}</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'MovieDetails',
    setup() {
      return {}
    },
  })
</script>

<style scoped></style>
