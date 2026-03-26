<template>
  <div class="bg-parchment w-full p-4 rounded-xl border border-stone-800/10 shadow-md flex flex-col min-h-0">
    <h3 class="font-display text-lg text-secondary mb-3 flex justify-between items-center shrink-0">
      <div class="flex items-center gap-2">
        <i class="fas fa-dice-d20 text-accent"></i> Log de Combate
      </div>
      <button @click="rollD20" class="text-sm font-bold bg-accent text-white px-4 py-2 rounded hover:bg-accent/80 transition-colors shadow-sm hover:scale-105">
        Tirar d20
      </button>
    </h3>
    
    <div 
      ref="logContainer" 
      class="flex-1 overflow-y-auto bg-stone-900 text-stone-300 p-4 text-base rounded border-2 border-stone-800 font-mono space-y-2 scrollbar-hide shadow-inner"
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
