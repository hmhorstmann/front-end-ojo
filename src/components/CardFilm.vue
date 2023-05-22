<template>
  <div class="film-card">
    <img :src="filmImageUrl" alt="Film Image" class="film-image" />
    <div class="film-details">
      <h3>{{ film.title }}</h3>
      <div class="subtitle">
        <p>Data de Lançamento: {{ film.release_date }}</p>
        <br />
        <p>Diretor: {{ film.director }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Film } from '../interfaces/FilmInterface'

  export default defineComponent({
    props: {
      film: {
        type: Object as () => Film,
        required: true,
      },
    },
    setup(props) {
      const filmImageUrl = ref<string>(
        `src/assets/images/episode_${props.film.episode_id}.jpg`
      )

      return {
        filmImageUrl,
      }
    },
  })
</script>

<style scoped>
  .film-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 268px;
    height: 464px;
    position: relative;
  }

  .film-image {
    position: absolute;
    width: 268px;
    height: 352px;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: 10px 10px 0px 0px;
  }

  .film-details {
    flex-grow: 1;
    box-sizing: border-box;
    width: 268px;
    height: 140px;
    background: #ffffff;
    border: 1px solid #cfcfcf;
    border-radius: 0px 0px 10px 10px;
    margin-top: 324px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  h3 {
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    height: 33.52px;
    line-height: 33.52px;
    background: #ffc700;
    border-radius: 0px;
    width: 100%;
    text-align: left;
    padding: 0 1rem;
  }

  .subtitle {
    font-size: 12px;
    padding: 1rem;
    text-align: left;
    width: 100%;
  }
</style>
