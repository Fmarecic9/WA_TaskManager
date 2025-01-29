<template>
    <div class="max-w-4xl mx-auto p-4">
    <addTask></addTask>
    <!-- Task List -->
    <div class="bg-white p-4 shadow rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        @click="goToRegister">
      Sign Up/Sign In</button>
      <ul class="space-y-4">
      </ul>
    </div>
    <div>
    <Task v-for="task in taskovi" :key="task.id"
      :id="task._id" 
      :naslov="task.naslov"
      :opis="task.opis" 
      :zavrsen="task.zavrsen" 
      :tag="task.tag">
    </Task>
    </div>
      
  </div>
</template>


<script setup>
import Task from './Task.vue'
import addTask from './addTask.vue'
import axios from 'axios'
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'

let taskovi = ref([])

const router = useRouter()

const goToRegister = () => {
  router.push('/registerLogin')
}

onMounted(async()=>{

 try{
  const token = localStorage.getItem("jwt_token"); 
    if (!token) {
      console.error("JWT token not found!");
      return;
    }
  let response = await axios.get('http://localhost:8000/tasks',
    {headers: {Authorization: `Bearer ${token}`}})
  
  console.log(response)
  let podaci = response.data
  taskovi.value = podaci
 }
 catch(e){
  console.error("Error", e)
 }
})
</script>
