import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import keycloak, { initKeycloak } from "./keycloak";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        let mounted = true;

        const initialize = async () => {

            try {

                console.log("Starting Keycloak initialization...");

                const authenticated = await initKeycloak();

                console.log(
                    "Keycloak initialization result:",
                    authenticated
                );

                if (!mounted) {
                    return;
                }

                if (authenticated) {

                    console.log("Keycloak token received");
                    console.log("User:", keycloak.tokenParsed);

                    setAuthenticated(true);
                    setUser(keycloak.tokenParsed);

                } else {

                    setAuthenticated(false);

                }

            } catch (error) {

                console.error(
                    "Keycloak initialization failed:",
                    error
                );

            } finally {

                if (mounted) {
                    setInitialized(true);
                }

            }
        };

        initialize();

        return () => {
            mounted = false;
        };

    }, []);

    const logout = async () => {

        await keycloak.logout({
            redirectUri: window.location.origin + "/"
        });

    };

    const getToken = async () => {

        try {

            await keycloak.updateToken(30);

            return keycloak.token;

        } catch (error) {

            console.error(
                "Token refresh failed:",
                error
            );

            await keycloak.login();

            return null;
        }
    };

    const getRoles = () => {

        return keycloak.tokenParsed?.realm_access?.roles || [];

    };

    const hasRole = (role) => {

        return getRoles().includes(role);

    };

    const isAdmin = () => {

        return (
            hasRole("HR") ||
            hasRole("MANAGER")
        );

    };

    if (!initialized) {

        return (
            <div className="d-flex justify-content-center align-items-center vh-100">

                <div className="text-center">

                    <div
                        className="spinner-border"
                        role="status"
                    />

                    <p className="mt-3">
                        Authenticating...
                    </p>

                </div>

            </div>
        );

    }

    return (
        <AuthContext.Provider
            value={{
                keycloak,
                initialized,
                authenticated,
                user,
                logout,
                getToken,
                getRoles,
                hasRole,
                isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};