<template>
  <Divider title="Movies"></Divider>
  <Carousel
    :modelValue="1"
    :itemsToShow="3"
    :wrapAround="true"
    :autoplay="0"
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
  <Carousel
    ref="peopleCarousel"
    :itemsToShow="3"
    :wrapAround="true"
    @slide-end="loop($event)"
  >
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
  // import { API } from '../services/axios'
  import axios from 'axios'
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

      const peopleCarousel = ref<any>()

      const getFilms = async (): Promise<Film[]> => {
        try {
          const response = await axios.get<FilmResponse>(
            'https://swapi.dev/api/films/'
          )
          return response.data.results
          // films.value = response.data.results
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      const getPeople = async (page: number = 1): Promise<Person[]> => {
        try {
          const response = await axios.get<PersonResponse>(
            `https://swapi.dev/api/people/?page=${page}`
          )
          loadedPages.value.push(page)
          data.value = response.data
          return response.data.results
          // people.value = response.data.results
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      onMounted(async () => {
        films.value = await getFilms()
        people.value = await getPeople()
      })

      const loadedPages = ref<number[]>([])
      const data = ref<PersonResponse>()

      const loop = async (param: any) => {
        if (param.currentSlideIndex == param.slidesCount - 3) {
          const url = data.value?.next
          const arrayUrl = url?.split('page=')
          const pageNumber = arrayUrl?.length ? parseInt(arrayUrl[1]) : 1

          // const count = data.value?.count
          // const arroundCount = count ? Math.ceil(count / 10) : 0

          if (!loadedPages.value.includes(pageNumber)) {
            const newPage = await getPeople(pageNumber)
            people.value = people.value.concat(newPage)
          }
        }
      }

      return { films, people, peopleCarousel, loop }
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
