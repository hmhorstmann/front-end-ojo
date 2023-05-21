<template>
  <Menubar class="navbar">
    <template #start>
      <div class="menu">
        <img alt="logo" src="../assets/icon.svg" height="50" class="logo" />
        <h1 class="title">Star Wars Universe</h1>
      </div>
    </template>

    <template #end>
      <InputText placeholder="Pesquisar Personagens" type="text" class="search" />
    </template>
  </Menubar>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Menubar from 'primevue/menubar'
  import InputText from 'primevue/inputtext'

  export default defineComponent({
    components: { Menubar, InputText },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .menu {
    display: flex;
    align-items: center;
    align-content: center;
  }
  .title {
    color: #ffffff;
    margin-left: 4rem;

  }
  .search {
    margin: 0 2rem;
    padding: 0 1rem ;
    width: 20rem;
    height: 2rem;
    text-align: right;
    border-radius: 0.5rem ;
  }
  .logo {
    margin-left: 0.5rem;
  }
  .navbar {
    background-color: #000000;
    width: 100vw;
    height: 5rem;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
</style>
