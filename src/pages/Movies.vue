<template>
  <Divider title="Movies"></Divider>
</template>

<script lang="ts">
  import Divider from '../components/Divider.vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Movies',
    components: {
      Divider
    },
    setup() {
      return {}
    },
  })
</script>

<style scoped></style>
