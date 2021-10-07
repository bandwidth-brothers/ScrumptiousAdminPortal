import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080/restaurant',
})

export const setAuthToken = token => {
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

export default instance
