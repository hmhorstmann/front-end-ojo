<template>
  <div class="divider">
    <div class="divider-line"></div>
    <h2 class="divider-title">{{ title }}</h2>
    <div class="divider-line"></div>
  </div>
</template>

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

<style scoped>
  .divider {
    margin: 2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    align-self: center;
  }

  .divider-line {
    flex-grow: 1;
    height: 1px;
    background-color: black;
  }

  .divider-title {
    font-weight: bold;
    font-size: 1.2rem;
  }
</style>
