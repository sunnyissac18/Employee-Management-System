import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
});

let initPromise = null;

export const initKeycloak = () => {

    if (!initPromise) {

        initPromise = keycloak.init({
            onLoad: "login-required",
            flow: "standard",
            pkceMethod: "S256",
            responseMode: "query",
            checkLoginIframe: false
        });

    }

    return initPromise;
};

export default keycloak;