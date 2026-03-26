<template>
  <div class="h-full flex flex-col p-4 lg:p-8 animate-fade-in overflow-y-auto overflow-x-hidden scrollbar-hide">

    <div class="text-center mb-4 xl:mb-6 flex-shrink-0">
      <h1 class="text-4xl xl:text-5xl leading-tight text-secondary drop-shadow-sm font-display">Arcane Grimoire</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-6 flex-1 min-h-0 items-stretch">

      <div class="lg:col-span-7 flex flex-col gap-4 xl:gap-6 justify-between h-full py-1">
        
        <div class="bg-secondary/5 p-4 rounded-r-xl border-l-4 border-accent shadow-sm">
          <p class="text-base xl:text-lg italic text-secondary/80 leading-relaxed">
            "Estas páginas contienen el conocimiento prohibido de eras pasadas y el registro de las bestias que acechan en la oscuridad."
          </p>
        </div>

        <div class="flex-1 flex items-center justify-center">
          <CampaignClock class="w-full max-w-sm" />
        </div>

        <StatsSkeleton v-if="isLoadingStats" />
        <div v-else-if="!isErrorStats" class="grid grid-cols-2 gap-4 mt-auto">
          <div class="bg-parchment p-4 md:p-5 rounded-xl border border-stone-800/10 shadow-md text-center hover:-translate-y-1 transition-transform relative group overflow-hidden">
            <div class="absolute inset-0 bg-stone-800/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 class="text-xs xl:text-sm font-display text-secondary tracking-wider uppercase mb-1 relative z-10">Tot. Monstruos</h4>
            <div class="text-3xl xl:text-4xl font-bold text-stone-800 relative z-10">{{ bestiaryStore.monsters.length }}</div>
          </div>
          <div class="bg-parchment p-4 md:p-5 rounded-xl border border-stone-800/10 shadow-md text-center hover:-translate-y-1 transition-transform relative group overflow-hidden">
            <div class="absolute inset-0 bg-stone-800/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 class="text-xs xl:text-sm font-display text-secondary tracking-wider uppercase mb-1 relative z-10">Magia Alta (Lvl 5+)</h4>
            <div class="text-3xl xl:text-4xl font-bold text-stone-800 relative z-10">{{ spellStore.highLevelSpellsCount }}</div>
          </div>
        </div>

      </div>

      <div class="lg:col-span-5 flex flex-col gap-4 xl:gap-6 h-full py-1">
        
        <div v-if="campaign" class="bg-secondary/10 p-4 rounded-xl border border-secondary/20 shadow-inner shrink-0">
          <h3 class="font-display text-sm xl:text-base text-secondary mb-2 flex items-center gap-2">
            <i class="fas fa-map text-accent"></i> Campaña Activa
          </h3>
          <div class="bg-parchment p-3 rounded-lg border border-stone-800/10 flex items-center justify-between shadow-sm">
            <span class="font-bold text-stone-800 text-base">{{ campaign.name }}</span>
            <span class="bg-stone-800 text-accent font-bold px-2 py-0.5 rounded shadow-inner text-sm">Nivel {{ campaign.level }}</span>
          </div>
        </div>

        <CombatLog class="flex-1" />

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
    
    const fetchBestiary = bestiaryStore.isFetched ? Promise.resolve() : bestiaryStore.fetchMonsters()
    const fetchSpells = spellStore.isFetched ? Promise.resolve() : spellStore.fetchSpells()
    
    await Promise.all([fetchBestiary, fetchSpells])
    
  } catch (error) {
    isErrorStats.value = true
    console.error("Error cargando estadísticas y conectando Stores:", error)
  } finally {
    isLoadingStats.value = false
  }
})
</script>

