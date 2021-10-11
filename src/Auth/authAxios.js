import axios from 'axios'

import AuthService from '../services/AuthService'

const instance = axios.create({
    baseURL: 'http://localhost:8080/auth',
    headers: { 'Content-Type': 'application/json' }
})

export const setAuthTokenA = token => {
    if (token) {
        console.log("CREATE")
        instance.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        console.log("DELETE")
        delete instance.defaults.headers.common['Authorization'];
    }
}

export const getAuthToken = () => {
    return instance.defaults.headers.common['Authorization']
}

instance.interceptors.request.use(request => {
    if (AuthService.isLoggedIn()) {
        request.headers['Authorization'] = localStorage.getItem('token')
    }
    return request
}, error => {
    return Promise.reject(error)
})

export default instance
