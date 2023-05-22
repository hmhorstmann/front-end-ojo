<template>
  <Divider title="Movies"></Divider>
  <Carousel
    :itemsToShow="3"
    :wrapAround="true"
    :autoplay="3000"
    :pauseAutoplayOnHover="true"
  >
    <Slide v-for="film in films" :key="film.episode_id">
      <div class="carousel__item">
        <CardFilm :film="film"></CardFilm>
        
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import Divider from '../components/Divider.vue'
  import { API } from '../services/axios'
  import { Film, FilmResponse } from '../interfaces/FilmInterface'
  import CardFilm from '../components/CardFilm.vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Navigation, Slide } from 'vue3-carousel'

  export default defineComponent({
    name: 'Movies',
    components: {
      Divider,
      CardFilm,
      Carousel,
      Slide,
      Navigation,
    },
    setup() {
      const films = ref<Film[]>([])
      const getFilms = async () => {
        try {
          const response = await API.get<FilmResponse>('films')
          films.value = response.data.results
          console.log('films', films.value)
        } catch (error) {
          console.error(error)
        }
      }

      onMounted(async () => {
        await getFilms()
      })

      return { films }
    },
  })
</script>

<style scoped>
  .carousel__item {
    width: 268px;
    height: 464px;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  .carousel__slide {
    padding: 2rem;
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 50px solid white;
  }
  .film-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 0;
  }
</style>
