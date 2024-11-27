import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { AuthResponse, LoginCredentials, RegisterData } from "@typetempo/models";
import { API_BASE_URL } from "@/constants";

export const useAuthStore = defineStore("auth", () => {
    // state
    const authResponse = ref<AuthResponse | null>(null);

    // computed
    const isAuthenticated = computed(() => !!authResponse.value?.token?.length);

    // actions
    const login = async (payload: LoginCredentials): Promise<AuthResponse | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                return null;
            }

            authResponse.value = await response.json();

            return authResponse.value;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const register = async (payload: RegisterData): Promise<AuthResponse | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                return null;
            }

            authResponse.value = await response.json();

            return authResponse.value;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        // state
        authResponse,
        // computed
        isAuthenticated,
        // actions
        login,
        register,
    };
});
