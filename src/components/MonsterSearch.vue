<template>
  <div class="relative w-full max-w-md z-10">
    <input 
      id="monster-search"
      name="monsterSearch"
      v-model="inputValue" 
      @input="onInput"
      type="text" 
      placeholder="Buscar criatura por nombre..." 
      class="w-full bg-stone-900/80 border border-secondary text-primary px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-shadow shadow-black/40 shadow-lg"
    >
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-secondary">
      <i class="fas fa-search"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const model = defineModel({ type: String, default: '' })
const inputValue = ref(model.value)
let timeoutId = null

watch(model, (newVal) => {
  if (inputValue.value !== newVal) {
    inputValue.value = newVal
  }
})

const onInput = () => {
  if (timeoutId) clearTimeout(timeoutId)
  
  timeoutId = setTimeout(() => {
    model.value = inputValue.value
  }, 400)
}
</script>
