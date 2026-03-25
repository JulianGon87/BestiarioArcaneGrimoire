<template>
  <div class="h-full flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in overflow-y-auto scrollbar-hide">
    
    <!-- Fila Superior: Título (Fuera del grid) -->
    <div class="text-center w-full mb-2 md:mb-4">
      <h1 class="text-[35px] md:text-[58px] leading-none md:leading-tight text-secondary drop-shadow-sm break-words w-full">Arcane Grimoire</h1>
    </div>

    <!-- Contenido y columnas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl mx-auto items-center">
      
      <!-- Columna Izquierda: Texto y Botón -->
      <div class="flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8 md:pr-4">
        <p class="text-base md:text-2xl italic text-secondary/80 leading-relaxed text-balance">
          "Bienvenido, viajero. Estas páginas contienen el conocimiento prohibido de eras pasadas y el registro de las bestias que acechan en la oscuridad."
        </p>
        
        <router-link to="/bestiario" class="px-8 py-3 bg-secondary text-primary font-display text-xl rounded shadow-lg shadow-black/30 hover:bg-secondary/90 hover:scale-105 transition-all cursor-pointer border-2 border-accent inline-block mb-6">
          Adentrarse en el Bestiario
        </router-link>

        <div v-if="campaign" class="mt-8 border-t border-secondary/30 pt-6 w-full max-w-sm mx-auto md:mx-0">
          <h3 class="font-display text-xl text-secondary mb-2">Campaña Activa</h3>
          <div class="bg-parchment p-4 rounded border border-stone-800/10 shadow-inner flex items-center justify-between">
            <span class="font-bold text-stone-800">{{ campaign.name }}</span>
            <span class="bg-stone-800 text-stone-200 text-sm px-2 py-1 rounded">Lvl {{ campaign.level }}</span>
          </div>
        </div>

        <!-- Herramientas (Octava Parte) -->
        <div class="w-full max-w-sm mx-auto md:mx-0 mt-4 flex flex-col sm:flex-row gap-4">
          <CampaignClock class="w-full sm:w-1/2 mt-0" />
        </div>
        <CombatLog />

        <!-- Stats (Octava Parte) -->
        <StatsSkeleton v-if="isLoadingStats" />
        <div v-else-if="!isErrorStats" class="flex gap-4 w-full max-w-sm mx-auto md:mx-0 mt-4">
          <div class="flex-1 bg-parchment p-4 rounded border border-stone-800/10 shadow-inner text-center">
            <h4 class="text-sm font-display text-secondary">Tot. Monstruos</h4>
            <div class="text-2xl font-bold text-stone-800">{{ bestiaryStore.monsters.length }}</div>
          </div>
          <div class="flex-1 bg-parchment p-4 rounded border border-stone-800/10 shadow-inner text-center">
            <h4 class="text-sm font-display text-secondary">Magia Alta (>= Lvl 5)</h4>
            <div class="text-2xl font-bold text-stone-800">{{ spellStore.highLevelSpellsCount }}</div>
          </div>
        </div>
      </div>

      <!-- Columna Derecha: Imagen -->
      <div class="w-full flex justify-center">
        <div class="w-[93%] md:w-[88%] lg:w-[83%] max-w-[31rem] rounded-xl shadow-2xl shadow-black/50 border-4 border-secondary/40 relative group overflow-hidden bg-stone-900 flex-shrink-0">
           <img src="/grimoire.png?v=2" alt="Arcane Grimoire Book" class="w-full h-auto object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
           <!-- Capa mágica oscura -->
           <div class="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useBestiaryStore } from '../stores/bestiaryStore.js'
import { useSpellStore } from '../stores/spellStore.js'
import CampaignClock from '../components/CampaignClock.vue'
import CombatLog from '../components/CombatLog.vue'
import StatsSkeleton from '../components/StatsSkeleton.vue'

const bestiaryStore = useBestiaryStore()
const spellStore = useSpellStore()
const campaign = inject('campaignContext', null)

const isLoadingStats = ref(true)
const isErrorStats = ref(false)

onMounted(async () => {
  try {
    isLoadingStats.value = true
    
    // Configurar Promesas condicionales si los stores aún no han sido pobladoss (isFetched)
    const fetchBestiary = bestiaryStore.isFetched ? Promise.resolve() : bestiaryStore.fetchMonsters()
    const fetchSpells = spellStore.isFetched ? Promise.resolve() : spellStore.fetchSpells()
    
    // Desplegar y esperar a que ambas tareas de red culminen en paralelo 
    await Promise.all([fetchBestiary, fetchSpells])
    
  } catch (error) {
    isErrorStats.value = true
    console.error("Error cargando estadísticas y conectando Stores:", error)
  } finally {
    isLoadingStats.value = false
  }
})
</script>

