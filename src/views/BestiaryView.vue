<template>
  <div class="h-full p-4 lg:p-8 overflow-y-auto scrollbar-hide animate-fade-in relative">
    <header class="mb-4 text-center pb-2">
      <h1 class="text-4xl lg:text-5xl mb-2 text-secondary font-display border-b-2 border-secondary/30 pb-4 inline-block px-10">
        Bestiario Arcano
      </h1>
      <p class="text-secondary/60 italic mt-2">Registro de criaturas conocidas</p>
    </header>

    <!-- Barra de búsqueda y filtrado -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full z-20">
      <MonsterSearch v-model="searchQuery" />
      <MonsterFilter v-model="selectedType" />
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
      <!-- Loading Skeletons -->
      <template v-if="loading">
        <MonsterSkeleton v-for="n in 6" :key="n" />
      </template>

      <!-- Mensaje cuando no hay resultados (Búsqueda fallida) -->
      <template v-else-if="filteredMonsters.length === 0">
        <div class="col-span-full py-16 text-center border border-dashed border-secondary/30 rounded-lg bg-stone-900/40">
           <i class="fas fa-ghost text-4xl text-secondary/40 mb-4 animate-bounce"></i>
           <h2 class="text-2xl font-display text-secondary/80">El conjuro de búsqueda falló</h2>
           <p class="text-stone-400 mt-2">No hay monstruos que coincidan con tus estipulaciones.</p>
        </div>
      </template>

      <!-- Monster Cards -->
      <template v-else>
        <MonsterCard 
          v-for="monster in filteredMonsters" 
          :key="monster.id" 
          :monster="monster"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMonsters } from '../composables/useMonsters.js'
import MonsterSearch from '../components/MonsterSearch.vue'
import MonsterFilter from '../components/MonsterFilter.vue'
import MonsterCard from '../components/MonsterCard.vue'
import MonsterSkeleton from '../components/MonsterSkeleton.vue'

const { searchQuery, selectedType, filteredMonsters } = useMonsters()
const loading = ref(true)

onMounted(() => {
  // Simulate network request
  setTimeout(() => {
    loading.value = false
  }, 600) // Reduced time slightly to match faster UX during filtering
})
</script>

