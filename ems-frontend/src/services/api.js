import axios from "axios";
import keycloak from "../auth/keycloak";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(
    async (config) => {

        try {

            await keycloak.updateToken(30);

            config.headers.Authorization =
                `Bearer ${keycloak.token}`;

        } catch (error) {

            console.error("Unable to refresh Keycloak token", error);

            keycloak.login();

        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;