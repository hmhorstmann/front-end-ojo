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

  <Divider title="Characters"></Divider>
  <Carousel :itemsToShow="3" :wrapAround="true">
    <Slide v-for="person in people" :key="person.name">
      <div class="carousel__item">
        <CardPeople :person="person"></CardPeople>
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
  import { Person, PersonResponse } from '../interfaces/PersonInterface.js'
  import CardFilm from '../components/CardFilm.vue'
  import CardPeople from '../components/CardPeople.vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Navigation, Slide } from 'vue3-carousel'

  export default defineComponent({
    name: 'Movies',
    components: {
      Divider,
      CardFilm,
      CardPeople,
      Carousel,
      Slide,
      Navigation,
    },

    setup() {
      const films = ref<Film[]>([])
      const people = ref<Person[]>([])

      const getFilms = async () => {
        try {
          const response = await API.get<FilmResponse>('films')
          films.value = response.data.results
          console.log('films', films.value)
        } catch (error) {
          console.error(error)
        }
      }

      const getPeople = async () => {
        try {
          const response = await API.get<PersonResponse>('people')
          people.value = response.data.results
          console.log('people', people.value)
        } catch (error) {
          console.error(error)
        }
      }

      onMounted(async () => {
        await getFilms()
        await getPeople()
      })

      return { films, people }
    },
  })
</script>

<style scoped>
  .carousel__item {
    width: 268px;
    min-height: 140px;
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
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
