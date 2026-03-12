<template>
  <div class="bg-parchment-light rounded-lg p-4 shadow-md border border-secondary/20 hover:shadow-xl hover:border-accent hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
    
    <!-- Card Content -->
    <div class="relative z-10 flex flex-col h-full">
      <!-- Image Area -->
      <router-link :to="{ name: 'monster-detail', params: { id: monster.id } }" class="w-full h-40 rounded mb-4 overflow-hidden border border-secondary/30 bg-secondary/5 relative group-hover:sepia-[.3] transition-all block">
        <img 
          :src="monster.image" 
          :alt="monster.name" 
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(62,39,35,0.3)] pointer-events-none"></div>
      </router-link>
  
      <!-- Header -->
      <div class="mb-2">
        <router-link :to="{ name: 'monster-detail', params: { id: monster.id } }" class="block w-fit">
          <h3 class="text-xl font-display text-secondary leading-tight mb-1 hover:text-accent-dark group-hover:text-accent-dark transition-colors">{{ monster.name }}</h3>
        </router-link>
        <TypeBadge :type="monster.type" />
      </div>
  
      <!-- Description (Truncated) -->
      <p class="text-sm text-secondary/80 italic mb-4 line-clamp-2">{{ monster.description }}</p>
  
      <!-- Stats Footer -->
      <div class="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-secondary/20 text-center font-bold text-secondary text-sm">
        <div class="flex flex-col items-center" title="Puntos de Golpe">
          <font-awesome-icon :icon="['fas', 'heart']" class="text-red-700/70 mb-1" />
          <span>{{ monster.hp }} HP</span>
        </div>
        <div class="flex flex-col items-center" title="Clase de Armadura">
          <font-awesome-icon :icon="['fas', 'shield-halved']" class="text-slate-600/70 mb-1" />
          <span>{{ monster.ac }} AC</span>
        </div>
        <div class="flex flex-col items-center" title="Desafío">
          <font-awesome-icon :icon="['fas', 'skull']" class="text-stone-800/70 mb-1" />
          <span>CR {{ formatCR(monster.cr) }}</span>
        </div>
      </div>
    </div>

    <!-- Decorative Corner (optional) -->
    <div class="absolute -bottom-6 -right-6 text-6xl text-secondary/5 rotate-12 group-hover:text-accent/10 transition-colors pointer-events-none font-display">
      ❧
    </div>

  </div>
</template>

<script setup>
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  monster: {
    type: Object,
    required: true
  }
})

const formatCR = (cr) => {
  if (cr === 0.25) return '1/4'
  if (cr === 0.5) return '1/2'
  if (cr === 0.125) return '1/8'
  return cr
}
</script>
