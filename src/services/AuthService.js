import instance, { setAuthTokenA } from "./Auth/authAxios.js";
import { setAuthTokenR } from "./auth/restaurantAxios.js";


class AuthService {

    async getAdminPasswordVerification(adminId, password) {
        console.log(password)
        return await instance.post(`auth/${adminId}`, password)
    }

    async login(username, password) {

        const response = await instance
            .post("/login", {
                username,
                password
            }).then().catch(err => {
                return err.message
            });

        if (response.data) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userId)
            localStorage.setItem('expiresAt', response.data.expiresAt)
            console.log("SETTING")
            setAuthTokenR(response.data.token)
            setAuthTokenA(response.data.token)
        }

        return response.data;
    }

    async register(data) {

        let rtnData = null
        const response = await instance
            .post("http://localhost:8080/restaurant/admins/register", data).then().catch(err => {
                if (err.response.status === 500) {
                    rtnData = "The email already exists in the system or something went wrong."
                } else {
                    rtnData = err.message
                }
            });
        console.log(response)
        return rtnData ? rtnData : response;
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        localStorage.removeItem('expiresAt')
        setAuthTokenR(null)
        setAuthTokenA(null)
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    getUserToken() {
        return localStorage.getItem('token');
    }

    isLoggedIn() {
        return this.getUserToken() ? true : false
    }
}

export default new AuthService();
