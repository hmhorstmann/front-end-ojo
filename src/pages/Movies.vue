<template>
  <LoadingOverlay />
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
    v-if="people && people.length"
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
      <Navigation v-if="people && people.length" />
    </template>
  </Carousel>
  <p v-else>Nenhum personagem encontrado!</p>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, watch } from 'vue'
  import Divider from '../components/Divider.vue'
  import axios from 'axios'
  import { Film, FilmResponse } from '../interfaces/FilmInterface'
  import { Person, PersonResponse } from '../interfaces/PersonInterface.js'
  import CardFilm from '../components/CardFilm.vue'
  import CardPeople from '../components/CardPeople.vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import { useSearchStore } from '../stores/searchStore'
  import LoadingOverlay from '../components/LoadingOverlay.vue'
  import { useLoadingStore } from '../stores/loadingStore'

  export default defineComponent({
    name: 'Movies',
    components: {
      Divider,
      CardFilm,
      CardPeople,
      Carousel,
      Slide,
      Navigation,
      LoadingOverlay,
    },

    setup() {
      const storeLoading = useLoadingStore()
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
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      const search = computed(() => {
        return storeSearch.search
      })

      watch(search, (currentSearch) => {
        handleSearch(currentSearch)
      })

      const handleSearch = async (currentSearch: string | undefined) => {
        loadedPages.value = [1]
        if (currentSearch && currentSearch.length) {
          try {
            storeLoading.setLoading(true)
            const searchUrl = `https://swapi.dev/api/people/?search=${currentSearch}&page=1`
            people.value = await getPeople(searchUrl)
            storeLoading.setLoading(false)
          } catch (error) {
            console.error(error)
          }
        } else {
          try {
            storeLoading.setLoading(true)
            people.value = await getPeople()
            storeLoading.setLoading(false)
          } catch (error) {
            console.error(error)
          }
        }
      }

      onMounted(async () => {
        storeLoading.setLoading(true)
        films.value = await getFilms()
        people.value = await getPeople()
        originalPeople.value = people.value.map((item) => item)
        storeLoading.setLoading(false)
      })

      const loadedPages = ref<number[]>([])
      const data = ref<PersonResponse>()

      const loop = async (param: any) => {
        console.log(param)
        console.log(people.value)
        if (param.currentSlideIndex == param.slidesCount - 3) {
          console.log('data', data.value)
          const url = data.value?.next
          const arrayUrl = url?.split('page=')
          const pageNumber = arrayUrl?.length ? parseInt(arrayUrl[1]) : 1

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
