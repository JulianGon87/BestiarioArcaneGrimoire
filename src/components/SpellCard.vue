<template>
  <div class="bg-stone-900 border border-secondary/30 p-5 rounded-lg relative overflow-hidden group shadow-lg">
    <!-- Botón interactivo: Libro o Varita -->
    <button 
      @click="togglePrepared"
      class="absolute top-4 right-4 text-2xl transition-all duration-300 z-10 hover:scale-110"
      :class="isPrepared 
        ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110' 
        : 'text-stone-500 opacity-50 hover:opacity-100'"
      title="Preparar/Olvidar hechizo"
    >
      <!-- Se usa el faBook que ya viene instalado en main.js -->
      <font-awesome-icon icon="book" />
    </button>
    
    <!-- Info Base del Hechizo -->
    <div class="relative z-0">
      <h3 class="text-xl font-display text-secondary mb-1 pr-10">{{ spell.name }}</h3>
      <p class="text-sm text-emerald-500/80 mb-3 italic font-semibold">{{ spell.level }}</p>
      
      <div class="text-stone-300 text-sm line-clamp-3 leading-relaxed border-t border-stone-700 pt-3">
        {{ spell.desc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCharacterStore } from '../stores/characterStore.js'

const props = defineProps({
  spell: {
    type: Object,
    required: true
  }
})

const characterStore = useCharacterStore()

// Chequear reactivamente si el slug/id del hechizo está dentro del array persistido
const isPrepared = computed(() => characterStore.preparedSpells.includes(props.spell.slug))

const togglePrepared = () => {
  characterStore.togglePreparedSpell(props.spell.slug)
}
</script>
