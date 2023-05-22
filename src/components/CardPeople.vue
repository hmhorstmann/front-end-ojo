<template>
  <div class="person-card">
    <h3>{{ person.name }}</h3>
    <div class="subtitle">
      <p>Data de Nascimento: {{ person.birth_year }}</p>
      <br />
      <p>Altura: {{ person.height }}cm</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Person } from '../interfaces/PersonInterface.js'

  export default defineComponent({
    props: {
      person: {
        type: Object as () => Person,
        required: true,
      },
    },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .person-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 268px;
    height: 140px;
    position: relative;
    border: 1px solid #cfcfcf;
    border-radius: 10px 10px 10px 10px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    height: 33.52px;
    line-height: 33.52px;
    background: #ffc700;
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    text-align: left;
    padding: 0 1rem;
  }

  .subtitle {
    font-size: 12px;
    padding: 1rem;
    text-align: left;
    box-sizing: border-box;
    width: 100%;
  }
</style>
