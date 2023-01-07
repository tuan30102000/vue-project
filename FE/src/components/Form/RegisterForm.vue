<template>
    <form v-if="!isAuth" name="login" @submit.prevent="submitRegister(e)">

        <h2>Đăng Nhập</h2>

        <InputField v-for="(item, index) in listIp" :key="index" v-model:values="values" :ipName="item.name"
            :validateFcs="item.validateFcs" :ipType="item.type" :isFirstSubmit="isFirstSubmit" />


        <button>Đăng Kí</button>
        <router-link :to="{ name: 'login' }" class="">Đã có tài khoản ? Đăng nhập tại đây</router-link>



    </form>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex';
import validateFunction from '../../validaition';
import InputField from './InputField.vue';
const store = useStore()

const toast = useToast()

const listIp = ref([{
    name: 'username',
    type: 'text',
    validateFcs: [validateFunction.isHasSpace(), validateFunction.maxlengthString(30), validateFunction.minlengthString(6)],
}, {
    name: 'email',
    type: 'text',
    validateFcs: [validateFunction.isHasSpace(), validateFunction.maxlengthString(30), validateFunction.isEmail()],
},
{
    name: 'password',
    type: 'password',
    validateFcs: [validateFunction.isHasSpace(), validateFunction.minlengthString(8), validateFunction.maxlengthString(20)],
},

],)
const values = ref({
    username: '',
    email: '',
    password: '',
})

let isFirstSubmit = ref(false)
let isAuth = computed(() => store.state.isAuth)
// function change() {
//     this.isFirstSubmit = false
//     // console.log(this)
// }
async function submitRegister() {
    this.isFirstSubmit = true
    const values = this.values
    const arr = Array.from(this.listIp).find((item) => validateFunction.runError(values[item.name], item.validateFcs).message)
    if (arr) return
    store.dispatch('register', { formData: values, toastFcError: toast.error, toastFcSuccess: toast.success })
}
</script>
<style scoped>
form {
    width: 400px;
    display: block;
    padding: 20px;
    height: 500px;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    margin: auto;
    margin-top: 100px;
}

h2 {
    margin-bottom: 22px;
    font-weight: bold;
    width: 100%;
    text-align: center;
}

a {
    display: block;
    margin-top: 10px;
    text-align: center;
}

button {
    width: 100%;
    height: 44px;
    font-size: 16px;
    background: #d71920;
    border: none;
    border-radius: 6px;
    color: #fff;
}
</style>