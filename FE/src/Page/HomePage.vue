<template >
    <div>
        <p>Home page</p>
        <p v-for="(value, key) in userData">
            {{ key }}: {{ value }}
        </p>
        <button @click="onLogOut">Đăng Xuất</button>
        <Redirect v-if="!isAuth" location="/login" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Redirect from '../components/Redirect.vue';
const store = useStore()
let isAuth = computed(() => store.state.isAuth)
let userData = computed(() => store.state.auth)
const onLogOut = () => {
    console.log('logout')
    store.commit('logOut')
}

</script>
<style scoped>

</style>
