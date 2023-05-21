<template>
  <Navbar />
  <main>
    <h1>Hello World</h1>
    <RouterView />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Navbar from './components/Navbar.vue'

  export default defineComponent({
    components: { Navbar },
    setup() {
      return {}
    },
  })
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: '#E5E5E5';
    color: '#000000';
    -webkit-font-smoothing: 'antialiased';
  }

  body,
  input,
  textarea,
  button {
    font-family: 'Fira Code', monospace;
    font-weight: 400;
  }

  main {
    margin-top: 6rem;
  }
</style>
