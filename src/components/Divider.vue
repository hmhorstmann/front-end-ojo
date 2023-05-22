<template>
  <div class="divider">
    <div class="divider-line"></div>
    <h2 class="divider-title">{{ title }}</h2>
    <div class="divider-line"></div>
  </div>
</template>

<style scoped>
  .divider {
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: black;
  }

  .divider-title {
    margin: 0 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'

  export default defineComponent({
    props: {
      title: {
        type: String as PropType<string>,
        default: '',
        required: true,
      },
    },
  })
</script>
