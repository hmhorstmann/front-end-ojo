import { defineStore } from 'pinia'
import { Review } from '../interfaces/ReviewInterface'

export const useReviewStore = defineStore('review', {
    state: () => ({
        reviewList: [] as Review[],
    }),
    getters: {
        getReviewsByEpisode: (state) => (episode: number | undefined) => {
            return state.reviewList.filter((review) => review.episode === episode);
        },
    },
    actions: {
        addReview(review: Review) {
            this.reviewList.push(review);
        },
        saveReviewsToLocalStorage() {
            localStorage.setItem('reviews', JSON.stringify(this.reviewList))
        },
        loadReviewsFromLocalStorage() {
            const storedReviews = localStorage.getItem('reviews')
            if (storedReviews) {
                this.reviewList = JSON.parse(storedReviews)
            }
        },
    },
})