<template>
  <div 
    class="bg-stone-900 border transition-all duration-300 rounded-lg relative overflow-hidden group shadow-lg cursor-pointer"
    :class="isExpanded ? 'border-accent shadow-accent/20 ring-1 ring-accent' : 'border-secondary/30 hover:border-secondary/60'"
    @click="toggleExpand"
  >
    <button 
      @click.stop="togglePrepared"
      class="absolute top-4 right-4 text-2xl transition-all duration-300 z-10 hover:scale-110"
      :class="isPrepared 
        ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110' 
        : 'text-stone-500 opacity-50 hover:opacity-100'"
      title="Preparar/Olvidar hechizo"
    >
      <i class="fas fa-book"></i>
    </button>
    
    <div class="relative z-0 p-5 pb-4">
      <h3 class="text-xl font-display text-secondary mb-1 pr-10" :class="{ 'text-accent': isExpanded }">{{ spell.name }}</h3>
      <p class="text-sm text-emerald-500/80 mb-3 italic font-semibold">{{ spell.level }}</p>
      
      <div 
        class="text-stone-300 text-sm leading-relaxed border-t border-stone-700 pt-3 transition-all duration-500"
        :class="{ 'line-clamp-3': !isExpanded, 'line-clamp-none': isExpanded }"
      >
        <span class="whitespace-pre-line">{{ spell.desc }}</span>
      </div>
      
      <div v-if="isExpanded" class="mt-4 pt-4 border-t border-stone-700/50 space-y-3 text-sm text-stone-400">
        
        <div class="flex gap-2 items-center text-stone-300">
          <i class="fas fa-magic text-accent w-4 text-center"></i> 
          <strong>Clases:</strong> 
          <span class="text-xs uppercase tracking-wider text-secondary">{{ spell.dnd_class }}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="bg-stone-800/50 p-2 rounded border border-stone-700/50">
            <span class="block text-stone-500 uppercase tracking-widest font-bold mb-1">Casteo</span>
            <span class="text-stone-300">{{ spell.casting_time }}</span>
          </div>
          <div class="bg-stone-800/50 p-2 rounded border border-stone-700/50">
            <span class="block text-stone-500 uppercase tracking-widest font-bold mb-1">Rango</span>
            <span class="text-stone-300">{{ spell.range }}</span>
          </div>
          <div class="bg-stone-800/50 p-2 rounded border border-stone-700/50">
            <span class="block text-stone-500 uppercase tracking-widest font-bold mb-1">Componentes</span>
            <span class="text-stone-300">{{ spell.components }} <span v-if="spell.material" class="text-stone-500 truncate inline-block max-w-full align-bottom" :title="spell.material">*</span></span>
          </div>
          <div class="bg-stone-800/50 p-2 rounded border border-stone-700/50">
            <span class="block text-stone-500 uppercase tracking-widest font-bold mb-1">Duración</span>
            <span class="text-stone-300">
              {{ spell.duration }}
              <strong v-if="spell.concentration === 'yes'" class="text-accent ml-1" title="Requiere concentración">(C)</strong>
            </span>
          </div>
        </div>

        <div v-if="spell.higher_level" class="mt-4 border-l-2 border-accent pl-3 text-stone-400/80 italic text-xs">
          <strong>A niveles superiores:</strong> <br/>
          {{ spell.higher_level }}
        </div>
      </div>

    </div>
    
    <div 
      class="w-full h-8 flex items-center justify-center bg-stone-900/80 border-t border-stone-800 text-stone-500 transition-colors group-hover:text-amber-500/70"
    >
      <i class="fas transition-transform duration-300" :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCharacterStore } from '../stores/characterStore.js'

const props = defineProps({
  spell: {
    type: Object,
    required: true
  }
})

const characterStore = useCharacterStore()
const isExpanded = ref(false)

const isPrepared = computed(() => characterStore.preparedSpells.includes(props.spell.slug))

const togglePrepared = () => {
  characterStore.togglePreparedSpell(props.spell.slug)
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>
