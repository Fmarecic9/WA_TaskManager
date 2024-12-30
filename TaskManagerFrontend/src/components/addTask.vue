<template>
  <div class="max-w-4xl mx-auto p-4">

 <header
      class="flex justify-between items-center bg-white p-4 shadow rounded-md mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Task Manager</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        @click="editing = true">
        Dodaj zadatak
      </button>
    </header>
    <!-- Editable Input Section -->
    <div v-if="editing" class="bg-white p-4 shadow rounded-md mb-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="naslov"
          >Naslov zadatka:</label
        >
        <input
          id="naslov"
          type="text"
          v-model="naslovZadatka"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Unesite naslov zadatka" />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="opis"
          >Opis zadatka:</label
        >
        <textarea
          id="opis"
          v-model="opisZadatka"
          rows="3"
          class="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Unesite opis zadatka"></textarea>
      </div>
      <div class="flex space-x-4">
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          @click="dodajZadatak">
          Spremi zadatak
        </button>
        <button
          class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          @click="editing = false">
          Odustani
        </button>
      </div>
    </div>
    <!--/Editable Input Section-->

  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios'

const naslovZadatka = ref("");
const opisZadatka = ref("");
const zavrsen = ref(false);
const tagovi = ref([])
const editing = ref(false);
const tasks = ref([]);

const dodajZadatak= async()=> {
  if (naslovZadatka.value.trim() && opisZadatka.value.trim()) {
   const noviTask = {
      naslov: naslovZadatka.value,
      opis: opisZadatka.value,
      zavrsen: false,
      tagovi: [],
    };
      tasks.value.unshift(noviTask);

        naslovZadatka.value = "";
        opisZadatka.value = "";
        editing.value = false;
  try{
    await axios.post('http://localhost:8000/tasks', noviTask)
    alert("Dodan zadatak")
  }
  catch(e){
    console.error("Nesto ni uredu", e)

  }
  }

}
</script>