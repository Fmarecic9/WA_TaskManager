<template>
         <span :class="tagMap[tag]" class="text-xs px-3 rounded-md ">
            {{tag}}
         </span>

</template>


<script setup> 
defineProps({
    tag:String,
});

let tagMap = {
    hitno: "bg-red-300 font-bold",
    faks: "bg-blue-300 font-bold",
    pomalon:"bg-green-300 font-bold" 
}
    
</script>