<template>
  <div class="bg-parchment w-full max-w-sm p-4 rounded border border-stone-800/10 shadow-inner mt-4">
    <h3 class="font-display text-lg text-secondary mb-2 flex justify-between items-center">
      Log de Combate
      <button @click="rollD20" class="text-sm bg-accent text-white px-3 py-1 rounded hover:bg-accent/80 transition-colors shadow-sm">
        Tirar d20
      </button>
    </h3>
    
    <div 
      ref="logContainer" 
      class="h-40 overflow-y-auto bg-stone-900 text-stone-300 p-2 text-sm rounded border-2 border-stone-800 font-mono space-y-1 scrollbar-hide"
    >
      <div v-for="(log, idx) in logs" :key="idx" class="border-b border-stone-700/50 pb-1">
        {{ log }}
      </div>
      <div v-if="logs.length === 0" class="text-stone-500 italic text-center mt-12">
        Sin tiradas...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const logs = ref([])
const logContainer = ref(null)

const rollD20 = () => {
  const result = Math.floor(Math.random() * 20) + 1
  logs.value.push(`Tirada de ataque: ${result}`)
}

watch(logs, async () => {
  await nextTick()
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight
  }
}, { deep: true })
</script>
