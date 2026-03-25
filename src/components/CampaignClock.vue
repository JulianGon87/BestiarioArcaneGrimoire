<template>
  <div class="bg-parchment p-4 rounded border border-stone-800/10 shadow-inner my-4 text-center">
    <h3 class="font-display text-lg text-secondary mb-2">Día de Campaña</h3>
    <div class="text-3xl font-bold text-stone-800">{{ day }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const day = ref(1)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    day.value++
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
