import { defineStore } from 'pinia'
import { ref } from 'vue'
// import axios from 'axios'
import axios from '../../services/axios'

export const useVisitorStore = defineStore('visitor', {
    state: () => ({
        liveUsers: ref([]),
        sessions: ref([]),
        devices: ref({
            title: '',
            categories: [],
            seriesData: []
        }),
        timezoneLang: ref([]),
        mapData: ref([]),
        userJourneys: ref([]),
        breadcrumb: ref([]),
        headers: ref({
            liveUsers: [],
            sessions: [],
            timezoneLang: [],
            userJourneys: []
        }),
        loading: ref(false),
        error: ref(null)
    }),

    actions: {
        async fetchLiveUsers() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/live-users')
                this.liveUsers = data.items || []
                this.headers.liveUsers = data.headers || []
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch live users'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async fetchSessionsSummary() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/sessions-summary')
                this.sessions = data.items || []
                this.headers.sessions = data.headers || []
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch sessions summary'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async fetchDeviceBreakdown() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/device-breakdown')
                this.devices = {
                    title: data.title || '',
                    categories: data.categories || [],
                    seriesData: data.seriesData || []
                }
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch device breakdown'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async fetchTimezonesAndLanguage() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/timezones-language')
                this.timezoneLang = data.items || []
                this.headers.timezoneLang = data.headers || []
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch timezones and language'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async fetchMapRealTime() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/map-realtime')
                this.mapData = data.data || []
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch map real-time data'
                console.error(error)
            } finally {
                this.loading = false
            }
        },

        async fetchUserJourneys() {
            try {
                this.loading = true
                const { data } = await axios.get('/admin/visitors/user-journey')
                this.userJourneys = data.items || []
                this.breadcrumb = data.breadcrumb || []
                this.headers.userJourneys = data.headers || []
            } catch (error) {
                this.error = error.response?.data?.message || 'Failed to fetch user journeys'
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }
})