import axios from 'axios'

const instance = axios.create({
    baseUrl: 'localhost:9041'
})

export const setAuthToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete instance.defaults.headers.common['Authorization'];
    }
}

export const getAuthToken = () => {
    return instance.defaults.headers.common['Authorization']
}

export default instance
