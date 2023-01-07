<template>
    <div class="login-box">
        <LoginForm />
        <Redirect v-if="isAuth" location="/" />
    </div>
</template>
<script setup>
import LoginForm from '../components/Form/LoginForm.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Redirect from '../components/Redirect.vue';
const store = useStore()

let isAuth = computed(() => store.state.isAuth)

</script>
<style>
.login-box {
    width: 100vw;
    height: 100vh;

}
</style>