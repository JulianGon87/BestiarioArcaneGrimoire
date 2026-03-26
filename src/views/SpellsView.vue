<template>
  <div class="p-6 lg:p-10 animate-fade-in flex flex-col h-full bg-primary overflow-hidden">
    <div class="mb-6 flex-shrink-0">
      <h1 class="text-4xl lg:text-5xl font-display text-secondary drop-shadow-sm mb-4">Grimorio de Hechizos</h1>
      
      <div class="flex flex-col md:flex-row gap-4 justify-between items-center bg-parchment p-4 rounded-xl shadow-md border border-stone-800/20">
        <div class="relative w-full md:w-2/3 lg:w-1/2 flex items-center gap-4">
          <div class="relative flex-1">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Buscar por nombre, nivel clase..."
              class="w-full bg-stone-900/5 border border-stone-800/20 rounded-lg pl-10 pr-4 py-2.5 text-stone-800 placeholder-stone-500/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500/70"></i>
          </div>
          
          <button 
            @click="togglePreparedFilter" 
            class="px-4 py-2.5 rounded-lg border font-bold text-sm transition-all focus:outline-none flex items-center gap-2"
            :class="showOnlyPrepared ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' : 'bg-stone-800/5 border-stone-800/20 text-stone-600 hover:bg-stone-800/10'"
            title="Mostrar solo tus hechizos preparados"
          >
            <i class="fas fa-book"></i>
            <span class="hidden md:inline">{{ showOnlyPrepared ? 'Preparados' : 'Todos' }}</span>
          </button>
        </div>

        <div class="text-sm font-bold text-stone-600 bg-stone-800/5 px-4 py-2 rounded-lg border border-stone-800/10 whitespace-nowrap">
          Mostrando {{ filteredSpells.length }} hechizos
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto scrollbar-hide -mx-2 px-2">
      <div v-if="spellStore.spells.length === 0" class="flex flex-col items-center justify-center h-full opacity-50">
        <i class="fas fa-hat-wizard text-6xl text-secondary mb-4"></i>
        <p class="text-xl text-stone-700 font-display">Sintonizando hilos arcanos...</p>
      </div>

      <div v-else-if="filteredSpells.length === 0" class="flex flex-col items-center justify-center py-20 opacity-50">
        <i class="fas fa-eye-slash text-5xl text-stone-500 mb-4"></i>
        <p class="text-lg text-stone-600 font-bold">Sin resultados arcanos para tu búsqueda.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 pb-10">
        <SpellCard 
          v-for="spell in filteredSpells" 
          :key="spell.slug"
          :spell="spell"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSpellStore } from '../stores/spellStore.js'
import { useCharacterStore } from '../stores/characterStore.js'
import SpellCard from '../components/SpellCard.vue'

const spellStore = useSpellStore()
const characterStore = useCharacterStore()

const searchQuery = ref('')
const showOnlyPrepared = ref(false)

onMounted(async () => {
  if (!spellStore.isFetched) {
    try {
      await spellStore.fetchSpells()
    } catch (e) {
      console.error(e)
    }
  }
})

const togglePreparedFilter = () => {
  showOnlyPrepared.value = !showOnlyPrepared.value
}

const filteredSpells = computed(() => {
  let baseSpells = spellStore.spells
  
  if (showOnlyPrepared.value) {
    baseSpells = baseSpells.filter(s => characterStore.preparedSpells.includes(s.slug))
  }

  if (!searchQuery.value) return baseSpells

  const lowerQuery = searchQuery.value.toLowerCase()
  return baseSpells.filter(s => {
    return (s.name || '').toLowerCase().includes(lowerQuery) || 
           (s.level || '').toLowerCase().includes(lowerQuery) ||
           (s.school || '').toLowerCase().includes(lowerQuery) ||
           (s.dnd_class || '').toLowerCase().includes(lowerQuery)
  })
})
</script>
