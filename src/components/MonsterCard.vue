<template>
  <div v-glow class="relative bg-primary border-2 border-secondary/30 rounded shadow-md font-body p-3 transition-all hover:-translate-y-1 hover:shadow-xl group overflow-hidden">
    
    <div class="relative z-10 flex flex-col h-full">
      <router-link :to="{ name: 'monster-stats', params: { id: monster.id } }" class="w-full h-40 rounded mb-4 overflow-hidden border border-secondary/30 bg-secondary/5 relative group-hover:sepia-[.3] transition-all block">
        <img 
          :src="monsterImage" 
          :alt="monster.name" 
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 shadow-[inset_0_0_20px_rgba(62,39,35,0.3)] pointer-events-none"></div>
      </router-link>
  
      <div class="mb-2">
        <router-link :to="{ name: 'monster-stats', params: { id: monster.id } }" class="block w-fit">
          <h3 class="text-xl font-display text-secondary leading-tight mb-1 hover:text-accent-dark group-hover:text-accent-dark transition-colors">{{ monster.name }}</h3>
        </router-link>
        <TypeBadge :type="monster.type" />
      </div>
  
      <p class="text-sm text-secondary/80 italic mb-4 line-clamp-2">{{ monster.description }}</p>
  
      <div class="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-secondary/20 text-center font-bold text-secondary text-sm relative">
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
        
        <button 
          @click.stop="$emit('open-grimoire', monster)"
          class="absolute -top-12 right-2 bg-accent text-secondary w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-accent/40 hover:shadow-xl transition-all border-2 border-secondary/30 z-20"
          title="Leer Grimorio"
        >
          <font-awesome-icon :icon="['fas', 'book']" />
        </button>
      </div>
    </div>

    <div class="absolute -bottom-6 -right-6 text-6xl text-secondary/5 rotate-12 group-hover:text-accent/10 transition-colors pointer-events-none font-display">
      ❧
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import TypeBadge from './TypeBadge.vue'

const props = defineProps({
  monster: {
    type: Object,
    required: true
  }
})

defineEmits(['open-grimoire'])

const monsterImage = computed(() => {
  if (props.monster.image) return props.monster.image
  
  const type = (props.monster.type || '').toLowerCase()
  let style = 'identicon' 
  
  if (type.includes('beast')) style = 'croodles'
  else if (type.includes('humanoid')) style = 'adventurer'
  else if (type.includes('construct')) style = 'bottts'
  else if (type.includes('undead')) style = 'lorelei'
  else if (type.includes('dragon')) style = 'shapes'
  else if (type.includes('fiend')) style = 'notionists'
  else if (type.includes('celestial')) style = 'micah'
  else if (type.includes('fey')) style = 'lorelei-neutral'
  else if (type.includes('giant')) style = 'big-ears'
  else if (type.includes('monstrosity')) style = 'croodles-neutral'
  else if (type.includes('ooze')) style = 'rings'
  else if (type.includes('plant')) style = 'pixel-art'
  else if (type.includes('aberration')) style = 'bottts-neutral'
  else if (type.includes('elemental')) style = 'shapes'
  
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${props.monster.id}&backgroundColor=3e2723,2d1e18`
})

const formatCR = (cr) => {
  if (cr === 0.25) return '1/4'
  if (cr === 0.5) return '1/2'
  if (cr === 0.125) return '1/8'
  return cr
}
</script>
