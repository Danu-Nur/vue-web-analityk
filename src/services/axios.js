// src/services/axios.js
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // default base API, bisa diubah sesuai kebutuhan
    headers: {
        Accept: 'application/json',
    },
    // withCredentials: true // jika pakai Laravel Sanctum
})

// Contoh Interceptor (opsional, misal untuk error handling global)
instance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    }
)

export default instance
