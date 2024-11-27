<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import type { LoginCredentials, RegisterData } from "@typetempo/models";
const { isAuthenticated } = storeToRefs(useAuthStore());
const { login, register } = useAuthStore();
const mode = ref<"login" | "register">("register");
const loginData = reactive<LoginCredentials>({ email: "", password: "" });
const registerData = reactive<RegisterData>({ email: "", name: "", password: "" });

const handleLoginSubmit = async () => {
    const response = await login(loginData);

    if (response) {
        // login successful
        console.log("login successful");
    }
};

const handleRegisterSubmit = async () => {
    const response = await register(registerData);

    if (response) {
        // register successful
        console.log("register successful");

        // automatically login after registration
        const response = await login({
            email: registerData.email,
            password: registerData.password,
        });

        if (response) {
            // login successful
            console.log("login successful");
        }
    }
};
</script>

<template>
    <div v-if="!isAuthenticated">
        <h1>{{ mode === "login" ? "Login" : "Register" }}</h1>
        <form v-if="mode === 'login'" ref="loginForm" @submit.prevent="handleLoginSubmit">
            <input id="email" type="text" name="email" placeholder="email" v-model="loginData.email" />
            <input id="password" type="password" name="password" placeholder="password" v-model="loginData.password" />
            <button type="submit">Login</button>
        </form>
        <form v-if="mode === 'register'" ref="registerForm" @submit.prevent="handleRegisterSubmit">
            <input id="name" type="text" name="name" placeholder="name" v-model="registerData.name" />
            <input id="email" type="email" name="email" placeholder="email" v-model="registerData.email" />
            <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                v-model="registerData.password"
            />
            <button type="submit">Register</button>
        </form>
        <button v-if="mode === 'login'" @click="mode = 'register'">Register instead</button>
        <button v-if="mode === 'register'" @click="mode = 'login'">Login instead</button>
    </div>
    <div v-else>
        <p class="green">You are logged in</p>
    </div>
</template>

<style scoped>
.green {
    color: green;
}
</style>
