import { AuthRequest } from "../model/auth-request.model";
import { AuthResponse } from "../model/auth-response.model";
import { apiClient as api } from "../auth/HttpInterceptor";

export const AuthService = {
    login: async (data: AuthRequest): Promise<AuthResponse> => {
        const _resp = await api.post<AuthResponse>("/auth/login", data);

        localStorage.setItem("currentUser", JSON.stringify(_resp.data));        

        return _resp.data;
    },

    logout: () => {
        localStorage.removeItem("currentUser");        
    },

    getCurrentUser: (): AuthResponse => {
        return JSON.parse(localStorage.getItem("currentUser"));
    },

    getCurrentRoles: (): string[] => {
        const tokenDecoded = AuthService.decodeToken(AuthService.getCurrentUser());
        const permissoes = tokenDecoded.authorities.split(",");

        return permissoes;
    },

    getCurrentToken: (): string => {
        const currentUser: AuthResponse = AuthService.getCurrentUser();

        return currentUser ? currentUser.token : null;
    },

    isAuthenticated: (): boolean => {
        const currentUser: AuthResponse = AuthService.getCurrentUser();

        return currentUser ? !AuthService.isTokenExpired(currentUser) : false;
    },

    isTokenExpired: (currentUser: AuthResponse): boolean => {
        return (Date.now() >= AuthService.decodeToken(currentUser).exp * 1000) ? true : false;
    },

    decodeToken: (currentUser: any) => {
        let base64Url = currentUser.token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        let jsonPayload = decodeURIComponent(atob(base64).split("").map(c => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));

        return JSON.parse(jsonPayload);
    }
}