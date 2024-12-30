<template>
   <div>
    <li
          class="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow"
          >
          <div>
            <p class="text-lg font-medium text-gray-800">{{naslov}}</p>
            <p class="text-sm text-gray-600">{{opis}}</p>
            <div>
                <TaskTag v-for="t in tag" :key="t" :tag="t"></TaskTag>
            </div>  
          </div>
          <!-- Task Actions -->
          <div class="flex space-x-2">
            <button 
              @click="finishTask" 
              v-if="jeZavrsen == false"
              class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
              Dovršeno
            </button>
            <button
            @click="confirmDelete"
              class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
              Obriši
            </button>
          </div>
        </li>
   </div> 
</template>


<script setup>
import TaskTag from './TaskTag.vue'
import axios from 'axios'
import {ref} from 'vue'

const props = defineProps({
  id: String,
  naslov: String,
  opis: String,
  zavrsen: Boolean,
  tag: Array
})
 
const jeZavrsen = ref(props.zavrsen)

const finishTask = (async()=>{
    try{
      await axios.patch(`http://localhost:8000/tasks/${props.id}`, {      
      id: props.id,
      zavrsen: true
      })
      jeZavrsen.value = true  
    }
    catch(e){
      console.error("Nesto ni dobro", e)
    }
})
const deleteTask = (async()=>{
    try{
      await axios.delete(`http://localhost:8000/tasks/${props.id}`)
      izbrisano.value = true
    }
    catch(e){
      console.error("Nesto ni dobro", e)
    }

})
const confirmDelete = () => {
  const potvrdi = window.confirm("Zelite li zaista izbrisati ovaj zadatak?")
  if (potvrdi){
    deleteTask()
  }
}

</script>