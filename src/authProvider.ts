import { AuthBindings } from "@refinedev/core";
import { AuthHelper } from "@refinedev/strapi-v4";

import { TOKEN_KEY, API_URL } from "./constants";

import axios from "axios";

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");

interface ILoginResponse {
    jwt: string;
    user: IUser;
}

interface IRole {
    id: number | string;
    name: string;
    description: string;
    type: string;
}

interface IUser {
    id: number | string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: IRole;
    created_at: string;
    updated_at: string;
}


export const authProvider: AuthBindings = {
    onError: async (error) => {
        if (error.status === 401 || error.status === 403) {
            return {
            logout: true,
            redirectTo: "/login",
            error,
            };
        }

        return {};
        },

    login: async ({ email, password }) => {
        //const { data, status } = await strapiAuthHelper.login(email, password);
        const { data, status } = await axios.post<ILoginResponse>(API_URL + "/api/auth/login", {
            email,
            password,
        });
        if (status === 200) {
            localStorage.setItem(TOKEN_KEY, data.jwt);

            // set header axios instance
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.jwt}`;

            return {
                success: true,
                redirectTo: "/",
            };
        }
        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Invalid email or password",
            },
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        localStorage.setItem(TOKEN_KEY, "");
        return null;
    }
    axiosInstance.defaults.headers.common[
        "Authorization"
    ] = `Bearer ${token}`;
    
    try {
        const { data, status } = await strapiAuthHelper.me(token);
        if (status === 200) {
            const { id, username, email } = data;
            return {
                id,
                name: username,
                email,
            };
        }
    } catch (error) {
        localStorage.setItem(TOKEN_KEY, "");
        return null;
    }
    return null;
},

};
