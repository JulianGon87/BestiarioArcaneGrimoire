<template>
  <BaseModal :isOpen="isOpen" @update:isOpen="$emit('update:isOpen', $event)">
    <template #header>
      <div class="pr-8">
        <h2 class="text-4xl lg:text-5xl font-display text-secondary text-shadow-gold tracking-wider">
          {{ monster?.name }}
        </h2>
      </div>
    </template>
    
    <template #body>
      <div v-if="monster" class="flex flex-col md:flex-row gap-5 items-stretch h-full">
        <!-- Imagen -->
        <div class="w-full md:w-5/12 h-56 md:h-auto min-h-[220px] rounded-lg overflow-hidden border-2 border-secondary/30 relative shadow-inner group shrink-0">
          <img 
            :src="monster.image" 
            :alt="monster.name" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
          <div class="absolute inset-0 shadow-[inset_0_0_40px_rgba(62,39,35,0.6)] pointer-events-none"></div>
        </div>
        
        <!-- Contenido y Botones -->
        <div class="flex-1 flex flex-col pt-1 md:pt-0">
          <!-- Descripción -->
          <div class="prose prose-stone max-w-none text-secondary/90 leading-relaxed text-base md:text-lg mb-4 flex-1">
            <p class="first-letter:text-5xl first-letter:font-display first-letter:text-accent first-letter:float-left first-letter:mr-2 first-letter:mt-1 text-justify drop-shadow-sm">
              {{ monster.description }}
            </p>
          </div>

          <!-- Botón de Acción -->
          <div class="flex justify-end pt-4 border-t border-secondary/20 mt-auto">
            <button 
              @click="addToTracker"
              class="px-5 py-2 bg-stone-900 text-stone-300 border border-secondary/50 hover:bg-secondary hover:text-primary transition-colors rounded shadow font-display tracking-wide text-sm md:text-base"
            >
              <i class="fas fa-plus mr-2 text-accent"></i> Añadir a encuentros
            </button>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue'
import { useToast } from '../composables/useToast.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  monster: {
    type: Object,
    default: null
  }
})

defineEmits(['update:isOpen'])

const { addToast } = useToast()

const addToTracker = () => {
  if (props.monster) {
    addToast(`¡${props.monster.name} añadido al rastreador de combate!`)
  }
}
</script>
