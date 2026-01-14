import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiclient.js";

const AuthService = {
    async login(data){
        const response = await apiClient.post("/auth/login",data);
        console.log("Login response:", response);

        if(response.data?.accessToken){
            AsyncStorage.setItem("access_token",response.data.accessToken);
        }
        return response;
    },

    async getuser(){
        const response = await apiClient.get("/auth/me");
        return response;
    },
    logout(){
        localStorage.removeItem("access_token");
    },
    async register(data){
        const response = await apiClient.post("/auth/register",data);
        return response;
    }
}

export default AuthService;