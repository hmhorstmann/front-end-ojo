import { createRouter, createWebHistory } from "vue-router"
import Movies from "../pages/Movies.vue"
import MovieDetails from "../pages/MovieDetails.vue"

const routes = [
    {
        path: "/",
        redirect: {
            name: 'movies'
        },
    },
    {
        path: "/movies",
        name: "movies",
        component: Movies,
    },
    {
        path: "/movie/:id",
        name: "movieDetails",
        component: MovieDetails,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router