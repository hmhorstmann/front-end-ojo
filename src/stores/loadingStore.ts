import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: true
    }),
    actions: {
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading
        }
    }
})