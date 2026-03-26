<template>
  <div class="h-full p-4 lg:p-8 overflow-y-auto scrollbar-hide animate-fade-in relative">
    <header class="mb-4 text-center pb-2">
      <h1 class="text-4xl lg:text-5xl mb-2 text-secondary font-display border-b-2 border-secondary/30 pb-4 inline-block px-10">
        Bestiario Arcano
      </h1>
      <p class="text-secondary/60 italic mt-2">Registro de criaturas conocidas</p>
    </header>

    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 w-full z-20">
      <MonsterSearch v-model="searchQuery" />
      <MonsterFilter v-model="selectedType" />
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
      <template v-if="isLoading">
        <MonsterSkeleton v-for="n in 6" :key="n" />
      </template>

      <template v-else-if="isError">
        <div class="col-span-full py-16 text-center border border-dashed border-red-900/40 rounded-lg bg-stone-900/40">
           <i class="fas fa-exclamation-triangle text-4xl text-red-500/40 mb-4 animate-pulse"></i>
           <h2 class="text-2xl font-display text-red-400">Falla en el conducto arcano</h2>
           <p class="text-stone-400 mt-2">No se pudieron recuperar los monstruos desde planos exteriores.</p>
        </div>
      </template>

      <template v-else-if="filteredMonsters.length === 0">
        <div class="col-span-full py-16 text-center border border-dashed border-secondary/30 rounded-lg bg-stone-900/40">
           <i class="fas fa-ghost text-4xl text-secondary/40 mb-4 animate-bounce"></i>
           <h2 class="text-2xl font-display text-secondary/80">El conjuro de búsqueda falló</h2>
           <p class="text-stone-400 mt-2">No hay monstruos que coincidan con tus estipulaciones.</p>
        </div>
      </template>

      <template v-else>
        <MonsterCard 
          v-for="monster in filteredMonsters" 
          :key="monster.id" 
          :monster="monster"
          @open-grimoire="openModal"
        />
      </template>
    </div>

    <div v-if="!isLoading && !isError && filteredMonsters.length > 0" class="flex justify-between items-center pb-8 max-w-2xl mx-auto w-full">
      <button 
        @click="fetchData(currentPage - 1, searchQuery, selectedType)" 
        :disabled="!prevUrl"
        class="px-6 py-2 bg-stone-900 text-secondary border border-secondary/30 rounded font-display hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <i class="fas fa-chevron-left mr-2"></i> Anterior
      </button>

      <span class="text-secondary/70 font-display text-sm tracking-widest">
        Pág. {{ currentPage }} / {{ totalPages }}
      </span>

      <button 
        @click="fetchData(currentPage + 1, searchQuery, selectedType)" 
        :disabled="!nextUrl"
        class="px-6 py-2 bg-stone-900 text-secondary border border-secondary/30 rounded font-display hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Siguiente <i class="fas fa-chevron-right ml-2"></i>
      </button>
    </div>

    <GrimoireModal 
      v-model:isOpen="isModalOpen" 
      :monster="selectedMonster" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMonsters } from '../composables/useMonsters.js'
import { useBestiaryStore } from '../stores/bestiaryStore.js'
import MonsterSearch from '../components/MonsterSearch.vue'
import MonsterFilter from '../components/MonsterFilter.vue'
import MonsterCard from '../components/MonsterCard.vue'
import MonsterSkeleton from '../components/MonsterSkeleton.vue'
import GrimoireModal from '../components/GrimoireModal.vue'

const { searchQuery, selectedType, filteredMonsters, currentPage, totalPages, nextUrl, prevUrl, totalCount, setMonsters } = useMonsters()
const store = useBestiaryStore()

const isLoading = ref(true)
const isError = ref(false)

const isModalOpen = ref(false)
const selectedMonster = ref(null)

const openModal = (monster) => {
  selectedMonster.value = monster
  isModalOpen.value = true
}

const fetchData = async (page = 1, search = '', type = '') => {
  try {
    isLoading.value = true
    isError.value = false
    const responseData = await store.fetchMonsters(page, search, type)
    setMonsters(responseData)
    currentPage.value = page
  } catch (error) {
    isError.value = true
    console.error("Error al cargar los monstruos", error)
  } finally {
    isLoading.value = false
  }
}

watch(searchQuery, (newSearch) => {
  fetchData(1, newSearch, selectedType.value)
})

watch(selectedType, (newType) => {
  fetchData(1, searchQuery.value, newType)
})

onMounted(() => {
  fetchData(currentPage.value, searchQuery.value)
})
</script>

