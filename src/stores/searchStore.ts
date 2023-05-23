import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => ({
        search: '' as string | undefined,
    }),
    actions: {
        setSeach(search: string | undefined) {
            this.search = search
        },
    },
})