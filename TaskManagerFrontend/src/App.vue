
<template>
  <div class="max-w-4xl mx-auto p-4">
    <addTask></addTask>
    <!-- Task List -->
    <div class="bg-white p-4 shadow rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Vaši zadaci</h2>
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

<style scoped></style>

<script setup>
import Task from './components/Task.vue'
import addTask from './components/addTask.vue'
import axios from 'axios'
import {ref,onMounted} from 'vue'

let taskovi = ref([])

onMounted(async()=>{
 let response = await axios.get('http://localhost:8000/tasks')
 try{
  console.log(response)
  let podaci = response.data
  taskovi.value = podaci
  }

 catch(e){
  console.error("Error", e)
 }
})




</script>
