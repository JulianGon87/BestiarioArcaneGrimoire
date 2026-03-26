<template>
  <div class="h-full w-full flex flex-col items-center justify-start p-4 relative overflow-y-auto">
    
    <div v-if="monster" class="shrink-0 max-w-3xl w-full bg-parchment-light rounded-xl overflow-hidden shadow-2xl border-4" :class="borderColorClass">
      
      <div class="h-64 w-full relative">
         <img :src="monster.image" :alt="monster.name" class="w-full h-full object-cover" />
         <div class="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent"></div>
         <h1 class="absolute bottom-4 left-6 text-4xl font-display text-primary text-shadow-gold tracking-wide">{{ monster.name }}</h1>
      </div>

      <div class="p-6 md:p-8 bg-parchment/50">
         <div class="flex flex-wrap items-center justify-between mb-6 pb-4 border-b border-stone-800/20">
            <TypeBadge :type="monster.type" class="text-xl" />
            <div class="flex gap-4 text-stone-800">
               <span class="font-bold flex items-center gap-2"><i class="fas fa-heart text-red-600"></i> {{ monster.hp }} HP</span>
               <span class="font-bold flex items-center gap-2"><i class="fas fa-shield-halved text-slate-500"></i> {{ monster.ac }} AC</span>
               <span class="font-bold flex items-center gap-2"><i class="fas fa-skull text-stone-700"></i> CR {{ monster.cr }}</span>
            </div>
         </div>

         <div class="flex gap-4 mb-4 border-b border-stone-800/20">
            <router-link 
               :to="{ name: 'monster-stats', params: { id: monster.id } }" 
               class="px-4 py-2 font-display text-lg text-stone-500 hover:text-secondary border-b-2 border-transparent transition-colors -mb-[1px]"
               exact-active-class="!text-secondary !border-secondary"
            >
               <i class="fas fa-chart-simple mr-2"></i>Estadísticas
            </router-link>

            <router-link 
               :to="{ name: 'monster-lore', params: { id: monster.id } }" 
               class="px-4 py-2 font-display text-lg text-stone-500 hover:text-secondary border-b-2 border-transparent transition-colors -mb-[1px]"
               exact-active-class="!text-secondary !border-secondary"
            >
               <i class="fas fa-book-journal-whills mr-2"></i>Lore
            </router-link>
         </div>

         <div class="mb-6 min-h-[160px]">
            <router-view :monster="monster" v-slot="{ Component }">
               <transition name="fade" mode="out-in">
                  <component :is="Component" />
               </transition>
            </router-view>
         </div>
         
         <div class="flex justify-center mt-8">
            <button @click="goBack" class="px-6 py-2 bg-secondary text-primary hover:text-accent font-display rounded hover:bg-secondary/90 transition shadow-md flex items-center gap-2">
              <i class="fas fa-arrow-left"></i> Volver al Bestiario
            </button>
         </div>
      </div>
    </div>
    
    <div v-else class="text-secondary text-2xl font-display mt-20 text-center">
      El monstruo no ha sido encontrado en las crónicas.
      <button @click="goBack" class="mt-6 px-6 py-2 block mx-auto bg-secondary text-primary font-display rounded hover:bg-secondary/90 transition shadow">
        Volver
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMonsters } from '../composables/useMonsters.js'
import TypeBadge from '../components/TypeBadge.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const { findMonsterById } = useMonsters()

const monster = computed(() => findMonsterById(props.id))

const borderColorClass = computed(() => {
  if (!monster.value) return 'border-secondary'
  
  const type = monster.value.type.toLowerCase()
  if (type === 'dragón' || type === 'dragon') return 'border-red-800'
  if (type === 'bestia') return 'border-green-800'
  if (type === 'no-muerto' || type === 'nomuerto') return 'border-purple-800'
  
  return 'border-secondary/40' 
})

const goBack = () => {
  router.push({ name: 'bestiario' })
}
</script>
