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
  import {
    computed,
    defineComponent,
    onMounted,
    onUpdated,
    ref,
    watch,
  } from 'vue'
  import Divider from '../components/Divider.vue'
  // import { API } from '../services/axios'
  import axios from 'axios'
  import { Film, FilmResponse } from '../interfaces/FilmInterface'
  import { Person, PersonResponse } from '../interfaces/PersonInterface.js'
  import CardFilm from '../components/CardFilm.vue'
  import CardPeople from '../components/CardPeople.vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import { useSearchStore } from '../stores/searchStore'

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
      const storeSearch = useSearchStore()
      const films = ref<Film[]>([])
      const people = ref<Person[]>([])
      const originalPeople = ref<Person[]>([])

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

      const getPeople = async (
        url: string | null = null
      ): Promise<Person[]> => {
        try {
          const response = await axios.get<PersonResponse>(
            url ? url : `https://swapi.dev/api/people/?page=1`
          )
          const arrayUrl = url?.split('page=')
          const pageNumber = arrayUrl?.length ? parseInt(arrayUrl[1]) : 1
          loadedPages.value.push(pageNumber)
          data.value = response.data
          return response.data.results
          // people.value = response.data.results
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      const search = computed(() => {
        return storeSearch.search
      })

      watch(search, (currentSearch) => {
        console.log({ currentSearch })
        handleSearch(currentSearch)
      })

      const handleSearch = async (currentSearch: string | undefined) => {
        loadedPages.value = [1]
        if (currentSearch && currentSearch.length) {
          const searchUrl = `https://swapi.dev/api/people/?search=${currentSearch}&page=1`
          people.value = await getPeople(searchUrl)
        } else {
          people.value = await getPeople()
        }
      }

      onMounted(async () => {
        films.value = await getFilms()
        people.value = await getPeople()
        originalPeople.value = people.value.map((item) => item)
      })

      onUpdated(() => {
        console.log('UPoriginal', originalPeople.value)
        console.log('UPpeople', people.value)
      })

      const loadedPages = ref<number[]>([])
      const data = ref<PersonResponse>()

      const loop = async (param: any) => {
        console.log(param)
        console.log(people.value)
        if (param.currentSlideIndex == param.slidesCount - 3) {
          console.log('data', data.value)
          // console.log('serach', search.value)
          // console.log('serach', search.value?.length)
          const url = data.value?.next
          const arrayUrl = url?.split('page=')
          const pageNumber = arrayUrl?.length ? parseInt(arrayUrl[1]) : 1

          // const count = data.value?.count
          // const arroundCount = count ? Math.ceil(count / 10) : 0

          if (!loadedPages.value.includes(pageNumber)) {
            const newPage = await getPeople(url)
            people.value = people.value.concat(newPage)
            originalPeople.value = originalPeople.value.concat(newPage)
            console.log('original', originalPeople.value)
            console.log('people', people.value)
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
