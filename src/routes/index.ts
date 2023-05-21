import { createRouter, createWebHistory } from "vue-router"
import Movies from "../pages/Movies.vue"
import Chars from "../pages/Chars.vue"

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
        path: "/characters",
        name: "chars",
        component: Chars,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router