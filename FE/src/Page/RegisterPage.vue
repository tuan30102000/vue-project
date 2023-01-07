<template>
    <div class="login-box">
        <RegisterForm />
        <Redirect v-if="isAuth" location="/" />
    </div>
</template>
<script setup>
import RegisterForm from '../components/Form/RegisterForm.vue';
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