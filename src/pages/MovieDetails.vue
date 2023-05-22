<template>
  <div class="container">
    <Divider :title="film?.title"></Divider>
    <section class="container-details">
      <div class="movie-details">
        <div class="description">
          <h3>Descrição</h3>
          <p>{{ film?.opening_crawl }}</p>
        </div>

        <div class="release">
          <h3>Data de Lançamento</h3>
          <p>{{ film?.release_date }}</p>
        </div>

        <div class="production">
          <div>
            <h3>Diretor</h3>
            <p>{{ film?.director }}</p>
          </div>
          <div>
            <h3>Produtor</h3>
            <p>{{ film?.producer }}</p>
          </div>
        </div>
      </div>

      <!-- :src="`../../src/assets/images/episode_${film?.episode_id}.jpg`" -->
      <img
        v-if="filmImageUrl"
        :src="filmImageUrl"
        alt="Film Image"
        class="film-image"
      />
    </section>

    <Divider title="Characters of the movie"></Divider>
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

    <Divider title="Write a Review"></Divider>
    <section class="container-form">
      <form @submit.prevent="submitForm" class="form">
        <div class="personal">
          <div>
            <label for="name">Your Name:</label>
            <input id="name" v-model="form.name" type="text" required />
          </div>
          <div>
            <label for="email">Your Email:</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
        </div>

        <div class="message">
          <label for="review">Review:</label>
          <textarea id="review" v-model="form.review" required></textarea>
        </div>

        <button type="submit" class="submit">Publish</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed, ComputedRef } from 'vue'
  import { useRouter } from 'vue-router'
  import Divider from '../components/Divider.vue'
  import { Film } from '../interfaces/FilmInterface'
  // import { API } from '../services/axios'
  import axios from 'axios'
  import { Person } from '../interfaces/PersonInterface'
  import { Carousel, Navigation, Slide } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'

  import CardPeople from '../components/CardPeople.vue'

  export default defineComponent({
    name: 'MovieDetails',
    components: { Divider, CardPeople, Carousel, Navigation, Slide },
    setup() {
      const router = useRouter()
      const id = router.currentRoute.value.params.id
      const film = ref<Film>()
      const people = ref<Person[]>([])

      const form = ref({
        name: '',
        email: '',
        review: '',
      })

      const submitForm = () => {
        try {
          console.log('Enviando Formulário...')
          console.log(form.value)
          console.info('Formulário Enviado!')
        } catch (error) {
          console.error(error)
        }
        console.log('Enviando Formulário...')
        console.log(form.value)
        console.info('Formulário Enviado!')
      }

      const getFilm = async () => {
        try {
          const response = await axios.get<Film>(
            `https://swapi.dev/api/films/${id}`
          )
          return response.data
          // film.value = response.data
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      const getPerson = async (url: string = '') => {
        try {
          const response = await axios.get<Person>(url)
          return response.data
          // people.value = response.data.results
        } catch (error) {
          console.error(error)
          throw error
        }
      }

      const filmImageUrl: ComputedRef<string | null> = computed(() => {
        const episode = film.value?.episode_id
        if (episode) {
          return `../../src/assets/images/episode_${episode}.jpg`
        } else {
          return null
        }
      })

      onMounted(async () => {
        film.value = await getFilm()
        const characters = film.value?.characters

        people.value = characters
          ? await Promise.all(
              characters.map(async (item) => {
                try {
                  return await getPerson(item)
                } catch (error) {
                  console.error(error)
                  throw error
                }
              })
            )
          : []
      })

      return { film, filmImageUrl, people, form, submitForm }
    },
  })
</script>

<style scoped>
  .container {
    display: block;
  }
  .container-details {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  .container-details img {
    margin: auto;
    padding: 0;
  }

  .movie-details {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    justify-content: space-between;
  }
  .description {
    margin-bottom: 5rem;
    text-align: justify;
  }

  .release {
    display: flex;
    justify-content: space-between;
  }

  .production {
    display: flex;
    justify-content: space-between;
  }

  h3 {
    margin-bottom: 1.5rem;
  }
  .film-image {
    width: 336px;
    height: 486px;
    left: 841px;
    top: 172px;

    border-radius: 15px;
    float: right;
    margin-right: 5rem;
  }

  .container-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    width: 928px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .personal {
    display: flex;
    justify-content: space-between;
  }

  .personal > div {
    width: 100%;
  }

  .personal > div > input {
    box-sizing: border-box;
    width: 453px;
    height: 39px;
    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 10px;
    margin: 0.5rem;
    padding: 0 1rem;
  }

  label {
    display: block;
    margin: 0.5rem;
  }

  .message {
    width: 100%;
  }

  .message > textarea {
    box-sizing: border-box;
    width: 928px;
    height: 133px;
    background: #ffffff;
    border: 1px solid #c5c5c5;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }

  .submit {
    margin-left: auto;
    width: 129px;
    height: 39px;
    background: #00ff66;
    border-radius: 10px;
    font-family: 'Fira Code';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #000000;
  }
</style>
