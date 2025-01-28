<template>
<body>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"> 
    <button @click="switchToLogin">Login</button>
    <button @click="switchToRegister">Register</button>
    </h2>
    <loginView v-if="isLogin"></loginView>
    <registerView v-if="isRegister"></registerView>
    <hr>
    
</body>
</template>



<script setup>
import loginView from './loginView.vue'
import registerView from './registerView.vue'
import {ref, onMounted} from 'vue'
import axios from 'axios'

let username = ref("")
let password = ref("")

let isLogin = ref(true)
let isRegister = ref(false)

const switchToLogin =()=> {
    isLogin.value = true;
    isRegister.value = false
}

const switchToRegister=()=>{
    isLogin.value = false;
    isRegister.value = true
}

</script>