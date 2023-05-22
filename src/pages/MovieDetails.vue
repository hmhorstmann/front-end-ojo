<template>
  <Divider :title="film?.title"></Divider>
  <div class="movie-details">
    <div class="container">
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

    <img
        v-if="filmImageUrl"
        :src="filmImageUrl"
      alt="Film Image"
      class="film-image"
    />
  </div>

  <Divider title="Characters of the movie"></Divider>

</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed, ComputedRef } from 'vue'
  import { useRouter } from 'vue-router'
  import Divider from '../components/Divider.vue'
  import { Film } from '../interfaces/FilmInterface'
  import { API } from '../services/axios'
import { Person } from '../interfaces/PersonInterface'

  export default defineComponent({
    name: 'MovieDetails',
    components: { Divider },
    setup() {
      const router = useRouter()
      const id = router.currentRoute.value.params.id
      const film = ref<Film>()
      const filmImageUrl = ref<string>()
      const people = ref<Person>()

      const getFilm = async () => {
        try {
          const response = await API.get<Film>(`films/${id}`)
          film.value = response.data
          console.log("people", people)
          console.log('film', film.value)
        } catch (error) {
          console.error(error)
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
        await getFilm()
        filmImageUrl.value = `src/assets/images/episode_${film.value?.episode_id}.jpg`

        console.log('router', id)
      })

      return { film, filmImageUrl }
    },
  })
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 2rem 10rem 2rem 2rem;
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

  .movie-details {
    display: flex;
    flex-wrap: nowrap;
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
</style>
